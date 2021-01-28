const Stripe = require("stripe");
const stripe = Stripe(
  process.env.STRIPE_SECRET_API_KEY,
);
import models from "../database/models";
import helpers from "../helpers";

const { successStat, errorStat } = helpers;

export const createSession = async (req, res) => {
  const { id, email } = req.session.user;

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    customer_email: email,
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: req.body.courseTitle,
            images: [req.body.image],
          },
          unit_amount: req.body.amount,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${
      req.headers.host.includes("localhost") ? "http://" : "https://"
    }${req.headers.host}/api/v1/stripe/retrieve-checkout-session?userId=${id}`,
    cancel_url: req.body.success_url,
  });

  const temp = await models.TempPayment.findOne({ where: { userId: id } });

  temp && temp.destroy();

  // console.log(session, "lklklk");
  await models.TempPayment.create({
    userId: req.session.user.id,
    sessionId: session.id,
    courseCohortId: req.body.courseCohortId,
  });

  // res.json({ id: session.id });
  return successStat(res, 200, "data", session);
};

export const retrieveSession = async (req, res) => {
  const { userId } = req.query;

  const details = await models.TempPayment.findOne({
    where: { userId },
    order: [["createdAt", "ASC"]],
  });

  const courseCohortId = details.courseCohortId;

  const cour = await models.CourseCohort.findOne({
    where: { id: courseCohortId },
  });

  const coursee = await models.Course.findOne({
    where: { id: cour.courseId },
  });

  const session =
    details && (await stripe.checkout.sessions.retrieve(details.sessionId));

  if (session.payment_status === "paid") {
    await models.StudentCourse.create({
      studentId: userId,
      courseCohortId,
      courseId: cour.courseId,
      isCompleted: false,
      expiresAt: cour.expiresAt,
      cohortId: cour.cohortId,
      status: "ongoing",
      progress: 0,
    });

    await cour.update({
      totalStudent: cour.totalStudent + 1,
    });

    await models.TransactionHistory.create({
      courseId: cour.courseId,
      email: session.customer_email,
      tnxRef: session.id,
      transactionId: session.id,
      paidAmount: session.amount_total / 100,
      currency: "USD",
      courseCohortId,
      studentId: userId,
      name: "",
      status: "Successful",
      courseAmount: coursee.cost / 380,
      remainingBalance:
        Number(coursee.cost / 380) - Number(session.amount_total / 100),
    });

    return res.redirect(
      `${req.headers.host.includes("localhost") ? "http://" : "https://"}${
        req.headers.host
      }/payment/${courseCohortId}`
    );
  }

  details.destroy();
};
