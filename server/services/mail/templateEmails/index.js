/* eslint-disable indent */
import moment from 'moment';

const dataAccelerator = (user, dateObj, whatsAppLink) => {
  const html = `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <div style="max-width: 600px;padding: 0 15px 30px 15px;margin: auto;box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);background: #f0f5ff;">
          <div style="background: #0f078e;height: 150px;margin: 0 -15px 0 -15pxx;padding: 15px;">
            <img
              src="https://utiva-app.s3.amazonaws.com/utiva-white.png"
              style="width: 80px;"
              alt="logo"
            />
          </div>
          <h3 style="color: #0f078e;">Dear ${user.firstName}</h3>

          <p>
            I warmly welcome you to the Utiva Data Accelerator program. We are super
            excited to have you become a part of this great ecosystem.
          </p>
          <div>
            <h3 style="color: #0f078e;">Kindly take note of the following:</h3>
            <ol style="margin-bottom: 5px;">
              <li style="margin-bottom:5px;font-size:0.9em">
                Your entire learning experience will be taking place via the <strong>Utiva
                Learning Platform</strong>. Here, you'll have access to all your learning
                materials, resources, important class links, post-class recordings,
                assignments etc. (Visit app.utiva.io and login)
              </li>

              <p>
                <strong>
                  It is imperative that you sign up on the learning platform and
                  update your full profile (picture, LinkedIn profile URL, a short
                  bio). Your course mates want to see you, connect with you, and
                  kickstart this learning journey with you).
                </strong>
              </p>

              <li style="margin-bottom:5px;font-size:0.9em">
                On the learning platform under the "Pre-learning session", there are
                two short videos on <strong>Introduction to Data Visualization</strong>. Please
                ensure you watch the videos before the class begins.
              </li>

              <li style="margin-bottom:5px;font-size:0.9em">
                <p>
                  Your live classes will be held on Zoom; the link to join is
                  available on the Learning Platform. It is also important that you
                  install SQL AND Power BI software on your laptop before coming
                  into class.
                </p>

                <div>
                  <h3 style="color: #0f078e;">TUTORIALS ON SQL INSTALLATION</h3>

                  <ol style="margin-bottom: 5px;">
                    <li style="margin-bottom:5px;font-size:0.9em">
                      Click
                      <a href="https://www.youtube.com/watch?v=AEZg-sTxxmw">here</a>
                      to watch if you have Windows OS.
                    </li>
                    <li style="margin-bottom:5px;font-size:0.9em">
                      Click
                      <a href="https://www.youtube.com/watch?v=EZAa0LSxPPU">here</a>
                      if you have a macOS.
                    </li>
                    <li style="margin-bottom:5px;font-size:0.9em">
                      Click
                      <a
                        href="https://drive.google.com/file/d/1KD_HqzaTXR9D8IP4N2T-T5vZXrE_96JY/view?usp=sharing"
                        >here</a
                      >
                      to view slide instructions
                    </li>
                  </ol>
                </div>

                <div>
                  <h3 style="color: #0f078e;">TUTORIALS ON POWER BI INSTALLATION</h3>

                  <div>
                    <h4 style="color: #0f078e;">For Windows OS Users</h4>
                    <ol style="margin-bottom: 5px;">
                      <li style="margin-bottom:5px;font-size:0.9em">
                        Download Power BI Desktop from Microsoft Store
                        https://powerbi.microsoft.com/en-us/desktop/
                      </li>
                      <li style="margin-bottom:5px;font-size:0.9em">Follow the instructions to install</li>
                      <li style="margin-bottom:5px;font-size:0.9em">
                        Download Power BI App on your mobile – this allows you the
                        option of viewing reports on your phone.
                      </li>
                    </ol>
                  </div>

                  <div>
                    <h4 style="color: #0f078e;">For macOS Users</h4>
                    <ol style="margin-bottom: 5px;">
                      <li style="margin-bottom:5px;font-size:0.9em">
                        Make sure you have a virtual windows interface installed e.
                        g Parallels and Virtual box, as instructed in the Excel
                        steps above)
                      </li>
                      <li style="margin-bottom:5px;font-size:0.9em">
                        Download Power Bi from Microsoft website here
                        https://powerbi.microsoft.com/en-us/desktop/
                      </li>
                      <li style="margin-bottom:5px;font-size:0.9em">
                        Now you can run Power BI after copying the downloaded file
                        to your virtual Windows desktop.
                      </li>
                      <li style="margin-bottom:5px;font-size:0.9em">
                        You can also run any other Windows app that normally will
                        not run on a Mac using Parallels.
                      </li>
                    </ol>
                  </div>
                </div>

                <p>
                  I will advise you to get started on the installations as soon as
                  possible. Reach out to me if you have any challenges.
                </p>
              </li>

              <li style="margin-bottom:5px;font-size:0.9em">
                You may need to join your classes from a second screen (perhaps your
                phone). This is important so that you are able to follow the
                facilitator's screen and also practice at the same time.
              </li>

              <li style="margin-bottom:5px;font-size:0.9em">
                Class begins with an orientation session on the
                ${moment(dateObj.date).format('Do MMM YYYY')}
                ${moment(dateObj.time, 'HH:mm:ss').format('hh:mm A')}
                (Nigerian time). More information about this will be shared.
                Endeavour to join in at least 10 minutes earlier so you can get a
                head start.
              </li>

              ${
                whatsAppLink
                  ? `<li style="margin-bottom:5px;font-size:0.9em">
                    Kindly join the{' '}
                    <a href="https://chat.whatsapp.com/K4E9yotG019Ey2gIJJ3Uis">
                      CLASS CHAT ROOM
                    </a>
                    . Please note that this is very important as all your class
                    discussions will be taking place here.
                  </li>`
                  : ''
              }

              <li style="margin-bottom:5px;font-size:0.9em">
                Finally, come with lots of enthusiasm as this is the beginning
                of an exciting journey.
              </li>
            </ol>

            <div>
              <h3 style="color: #0f078e;">
                Note that ALL the classes are very essential if you want to get
                maximum value.
              </h3>

              <p>
                ${user.firstName},
                please feel free to reach out to me if you have any
                questions or further information.
              </p>

              <p>Best Regards.</p>
            </div>
          </div>
        </div>
      </body>
    </html>
    `;
  return {
    html,
    subject: `Welcome to the Utiva Data Accelerator Program, ${user.firstName} | Read Carefully`,
  };
};

const dataIncubator = (user, dateObj, whatsAppLink) => {
  const html = `
    <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap"
            rel="stylesheet"
          />

        </head>
        <body>
        <div style="max-width: 600px;padding: 0 15px 30px 15px;margin: auto;box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);background: #f0f5ff;">
        <div style="background: #0f078e;height: 150px;margin-left: -15px;margin-right: -15px;padding: 15px;">
          <img
            src="https://utiva-app.s3.amazonaws.com/utiva-white.png"
            style="width: 80px;"
            alt="logo"
          />
        </div>
        <h3 class="">Dear ${user.firstName}</h3>

        <p>
          I warmly welcome you to the Utiva Data Incubator program. We are super
          excited to have you become a part of this great ecosystem.
        </p>
        <div>
          <h3 style="color: #0f078e;">Kindly take note of the following:</h3>
          <ol style="margin-bottom: 5px;">
            <li style="margin-bottom:5px;font-size:0.9em">
              Your entire learning experience will be taking place via the <strong>Utiva
              Learning Platform</strong>. Here, you'll have access to all your learning
              materials, resources, important class links, post-class recordings,
              assignments etc. (Visit app.utiva.io and login)
            </li>

            <p>
              <strong>
                It is imperative that you sign up on the learning platform and
                update your full profile (picture, LinkedIn profile URL, a short
                bio). Your course mates want to see you, connect with you, and
                kickstart this learning journey with you).
              </strong>
            </p>

            <li style="margin-bottom:5px;font-size:0.9em">
              On the learning platform under the "Pre-learning session", there are
              two short videos on <strong>Introduction to Excel</strong>. Please
              ensure you watch the videos before the class begins.
            </li>

            <li style="margin-bottom:5px;font-size:0.9em">
              <p>
              Your live classes will be held on Zoom; the link to join is available on the Learning Platform. It is also important that you install Microsoft Excel (no later than version 2016 ) AND SQL software on your laptop before coming into class.
              </p>

              <div>
                <h3 style="color: #0f078e;">TUTORIALS ON SQL INSTALLATION</h3>

                <ol style="margin-bottom: 5px;">
                  <li style="margin-bottom:5px;font-size:0.9em">
                    Click
                    <a href="https://www.youtube.com/watch?v=AEZg-sTxxmw">here</a>
                    to watch if you have Windows OS.
                  </li>
                  <li style="margin-bottom:5px;font-size:0.9em">
                    Click
                    <a href="https://www.youtube.com/watch?v=EZAa0LSxPPU">here</a>
                    if you have a macOS.
                  </li>
                  <li style="margin-bottom:5px;font-size:0.9em">
                    Click
                    <a
                      href="https://drive.google.com/file/d/1KD_HqzaTXR9D8IP4N2T-T5vZXrE_96JY/view?usp=sharing"
                      >here</a
                    >
                    to view slide instructions
                  </li>
                </ol>
              </div>

              <p>
                I will advise you to get started on the installations as soon as
                possible. Reach out to me if you have any challenges.
              </p>
            </li>

            <li style="margin-bottom:5px;font-size:0.9em">
              You may need to join your classes from a second screen (perhaps your
              phone). This is important so that you are able to follow the
              facilitator's screen and also practice at the same time.
            </li>

            <li style="margin-bottom:5px;font-size:0.9em">
              Class begins with an orientation session on the
              ${moment(dateObj.date).format('Do MMM YYYY')}
              ${moment(dateObj.time, 'HH:mm:ss').format('hh:mm A')}
              (Nigerian time). More information about this will be shared.
              Endeavour to join in at least 10 minutes earlier so you can get a
              head start.
            </li>

            ${
              whatsAppLink
                ? `<li style="margin-bottom:5px;font-size:0.9em">
              Kindly join the
              <a href="https://chat.whatsapp.com/LyVZQOU6PK51eRIZ2Ka7w7"
                >CLASS CHAT ROOM</a
              >. Please note that this is very important as all your class
              discussions will be taking place here.
            </li>`
                : ''
            }

            <li style="margin-bottom:5px;font-size:0.9em">
              Finally, come with lots of enthusiasm as this is the beginning
              of an exciting journey.
            </li>
          </ol>

          <div>
            <h3 style="color: #0f078e;">
              Note that ALL the classes are very essential if you want to get
              maximum value.
            </h3>

            <p>
              ${user.firstName}, please feel free to reach out to me if you have
              any questions or further information.
            </p>

            <p>Best Regards.</p>
          </div>
        </div>
      </div>
        </body>
      </html>
      `;
  return {
    html,
    subject: `Welcome to the Utiva Data Incubator Program, ${user.firstName} | Read Carefully`,
  };
};

const carrerStarters = (user, dateObj, whatsAppLink) => {
  const html = `
      <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link
              href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap"
              rel="stylesheet"
            />
          </head>
          <body>
      <div style="max-width: 600px;padding: 0 15px 30px 15px;margin: auto;box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);background: #f0f5ff;">
      <div style="background: #0f078e;height: 150px;margin-left: -15px;margin-right: -15px;padding: 15px;">
        <img
          src="https://utiva-app.s3.amazonaws.com/utiva-white.png"
          style="width: 80px;"
          alt="logo"
        />
      </div>
      <h3 class="">Dear ${user.firstName}</h3>

      <p>
        I warmly welcome you to the Utiva Data Career Starters program. We are
        super excited to have you become a part of this great ecosystem.
      </p>
      <div>
        <h3 style="color: #0f078e;">Kindly take note of the following:</h3>
        <ol style="margin-bottom: 5px;">
          <li style="margin-bottom:5px;font-size:0.9em">
            Your entire learning experience will be taking place via
            <strong>Utiva Learning Platform</strong>. Here, you'll have access
            to all your learning materials, resources, important class links,
            post-class recordings, assignments etc. (Visit app.utiva.io and
            login)
          </li>

          <p>
            <strong>
              It is imperative that you sign up on the learning platform and
              update your full profile (picture, LinkedIn profile URL, a short
              bio). Your course mates want to see you, connect with you, and
              kickstart this learning journey with you).
            </strong>
          </p>

          <li style="margin-bottom:5px;font-size:0.9em">
            On the learning platform under the "Pre-learning session", there are
            two short videos on <strong>Introduction to Excel</strong>. Please
            ensure you watch the videos before the class begins.
          </li>

          <li style="margin-bottom:5px;font-size:0.9em">
            <p>
              Your live classes will be held on Zoom; the link to join is
              available on the Learning Platform. It is also important that you
              install Microsoft Excel (no later than version 2016 ) AND Power BI
              software on your laptop before coming into class.
            </p>

            <div>
              <h3 style="color: #0f078e;">TUTORIALS ON EXCEL INSTALLATION</h3>

              <ol style="margin-bottom: 5px;">
                <li style="margin-bottom:5px;font-size:0.9em">
                  Download and Install Parallels
                  <a href="https://www.parallels.com/products/desktop/trial/"
                    >here</a
                  >:
                </li>

                <h3 style="color: #0f078e;">Tutorials on how to install Parallels:</h3>
                <ol style="margin-bottom: 5px;">
                  <li style="margin-bottom:5px;font-size:0.9em">Run Parallels on your macOS</li>
                  <li style="margin-bottom:5px;font-size:0.9em">
                    Download Windows 10 ISO:
                    <a href="https://www.youtube.com/watch?v=ARQ4sCyBsmk"
                      >https://www.youtube.com/watch?v=ARQ4sCyBsmk</a
                    >
                  </li>
                  <li style="margin-bottom:5px;font-size:0.9em">
                    After this is downloaded and installed you will see a
                    replica of a Windows 10 OS on your screen.
                  </li>
                  <li style="margin-bottom:5px;font-size:0.9em">Now install Excel on your virtual Windows desktop.</li>
                  <li style="margin-bottom:5px;font-size:0.9em">
                    You can also run any other Windows app that normally will
                    not run on a Mac using Parallels
                  </li>
                </ol>
              </ol>
            </div>

            <div>
              <h3 style="color: #0f078e;">TUTORIALS ON POWER BI INSTALLATION</h3>

              <div>
                <h4 style="color: #0f078e;">For Windows OS Users</h4>
                <ol style="margin-bottom: 5px;">
                  <li style="margin-bottom:5px;font-size:0.9em">
                    Download Power BI Desktop from Microsoft Store
                    https://powerbi.microsoft.com/en-us/desktop/
                  </li>
                  <li style="margin-bottom:5px;font-size:0.9em">Follow the instructions to install</li>
                  <li style="margin-bottom:5px;font-size:0.9em">
                    Download Power BI App on your mobile – this allows you the
                    option of viewing reports on your phone.
                  </li>
                </ol>
              </div>

              <div>
                <h4 style="color: #0f078e;">For macOS Users</h4>
                <ol style="margin-bottom: 5px;">
                  <li style="margin-bottom:5px;font-size:0.9em">
                    Make sure you have a virtual windows interface installed e.
                    g Parallels and Virtual box, as instructed in the Excel
                    steps above)
                  </li>
                  <li style="margin-bottom:5px;font-size:0.9em">
                    Download Power Bi from Microsoft website here
                    https://powerbi.microsoft.com/en-us/desktop/
                  </li>
                  <li style="margin-bottom:5px;font-size:0.9em">
                    Now you can run Power BI after copying the downloaded file
                    to your virtual Windows desktop.
                  </li>
                  <li style="margin-bottom:5px;font-size:0.9em">
                    You can also run any other Windows app that normally will
                    not run on a Mac using Parallels.
                  </li>
                </ol>
              </div>
            </div>

            <p>
              I will advise you to get started on the installations as soon as
              possible. Reach out to me if you have any challenges.
            </p>
          </li>

          <li style="margin-bottom:5px;font-size:0.9em">
            You may need to join your classes from a second screen (perhaps your
            phone). This is important so that you are able to follow the
            facilitator's screen and also practice at the same time.
          </li>

          <li style="margin-bottom:5px;font-size:0.9em">
            Class begins with an orientation session on the
            ${moment(dateObj.date).format('Do MMM YYYY')}
            ${moment(dateObj.time, 'HH:mm:ss').format('hh:mm A')}
            (Nigerian time). More information about this will be shared.
            Endeavour to join in at least 10 minutes earlier so you can get a
            head start.
          </li>

          ${
            whatsAppLink
              ? `<li style="margin-bottom:5px;font-size:0.9em">
            Kindly join the
            <a href="https://chat.whatsapp.com/KKTm66CxNdIGYaEmVAftur"
              >CLASS CHAT ROOM</a
            >. Please note that this is very important as all your class
            discussions will be taking place here.
          </li>`
              : ''
          }

          <li style="margin-bottom:5px;font-size:0.9em">
            Finally, come with lots of enthusiasm as this is the beginning
            of an exciting journey.
          </li>
        </ol>

        <div>
          <h3 style="color: #0f078e;">
            Note that ALL the classes are very essential if you want to get
            maximum value.
          </h3>

          <p>
            ${user.firstName}, please feel free to reach out to me if you have
            any questions or further information.
          </p>

          <p>Best Regards.</p>
        </div>
      </div>
    </div>
          </body>
        </html>
        `;
  return {
    html,
    subject: `Welcome to Utiva Career Starters Program, ${user.firstName} | Read Carefully`,
  };
};

const designSchool = (user, dateObj, whatsAppLink) => {
  const html = `
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link
            href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap"
            rel="stylesheet"
            />
        </head>
        <body>
      <div style="max-width: 600px;padding: 0 15px 30px 15px;margin: auto;box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);background: #f0f5ff;">
        <div style="background: #0f078e;height: 150px;margin-left: -15px;margin-right: -15px;padding: 15px;">
            <img
            src="https://utiva-app.s3.amazonaws.com/utiva-white.png"
            style="width: 80px;"
            alt="logo"
            />
        </div>
        <h3 class="">Hello ${user.firstName}</h3>

        <p>
            Trust this email finds you well. I am very excited to welcome you to The
            Utiva Design School, the first premium learning program in the Tech
            Design space. This is where you learn to design technology Softwares.
        </p>
        <div>
            <h3 style="color: #0f078e;">
            Kindly note that the class begins with an orientation session on the
            ${moment(dateObj.date).format('Do MMM YYYY')}
            ${moment(dateObj.time, 'HH:mm:ss').format('hh:mm A')}.
            (More information will be sent to you soon)
            </h3>

            <p>
            Kindly follow this link to download some important Learning resources
            to prepare you for the class. This folder will be updated frequently
            with more materials during the course of the class. Feel free to study
            them during your leisure.
            </p>

            <h3 style="color: #0f078e;">It is also imperative to take note of the following:</h3>
            <ol style="margin-bottom: 5px;">
            <li style="margin-bottom:5px;font-size:0.9em">The class is a <strong>100% live virtual class</strong></li>

            <li style="margin-bottom:5px;font-size:0.9em">
                The
                <a href="https://app.utiva.io/">Utiva Learning Platform</a> would be
                your primary platform for class activities. Kindly create an account
                (if you have not) and ensure your profile is updated.
            </li>

            <li style="margin-bottom:5px;font-size:0.9em">
                The Online Classes will be coordinated via the
                <a
                href="https://utiva-dot-yamm-track.appspot.com/Redirect?ukey=1F_0ihH6BFugo7fGaiKdIvV0uCX535CpTBz2Gm6leNCQ-1889823889&key=YAMMID-24425385&link=https%3A%2F%2Futiva-dot-yamm-track.appspot.com%2FRedirect%3Fukey%3D1F_0ihH6BFugo7fGaiKdIvV0uCX535CpTBz2Gm6leNCQ-1151659928%26key%3DYAMMID-88690408%26link%3Dhttps%253A%252F%252Futiva-dot-yamm-track.appspot.com%252FRedirect%253Fukey%253D1F_0ihH6BFugo7fGaiKdIvV0uCX535CpTBz2Gm6leNCQ-1573593702%2526key%253DYAMMID-83841462%2526link%253Dhttps%25253A%25252F%25252Futiva-dot-yamm-track.appspot.com%25252FRedirect%25253Fukey%25253D1y98fSpOCNuBUtltc9eWiEENvi4pzi6oLphMdORRb5d0-2055262072%252526key%25253DYAMMID-77658637%252526link%25253Dhttps%2525253A%2525252F%2525252Futiva-dot-yamm-track.appspot.com%2525252FRedirect%2525253Fukey%2525253D1y98fSpOCNuBUtltc9eWiEENvi4pzi6oLphMdORRb5d0-1340015954%25252526key%2525253DYAMMID-76284796%25252526link%2525253Dhttps%252525253A%252525252F%252525252Futiva-dot-yamm-track.appspot.com%252525252FRedirect%252525253Fukey%252525253D1y98fSpOCNuBUtltc9eWiEENvi4pzi6oLphMdORRb5d0-1602173686%2525252526key%252525253DYAMMID-17174521%2525252526link%252525253Dhttps%25252525253A%25252525252F%25252525252Futiva-dot-yamm-track.appspot.com%25252525252FRedirect%25252525253Fukey%25252525253D1x1UMEGQ0d5MthGgGmJYx3Xgyh75rSPjCp7P5SOaN4Tc-550441438%252525252526key%25252525253DYAMMID-70552994%252525252526link%25252525253Dhttps%2525252525253A%2525252525252F%2525252525252Futivateam-dot-yamm-track.appspot.com%2525252525252FRedirect%2525252525253Fukey%2525252525253D1x1UMEGQ0d5MthGgGmJYx3Xgyh75rSPjCp7P5SOaN4Tc-2038401173%25252525252526key%2525252525253DYAMMID-99730259%25252525252526link%2525252525253Dhttps%252525252525253A%252525252525252F%252525252525252Fplay.google.com%252525252525252Fstore%252525252525252Fapps%252525252525252Fdetails%252525252525253Fid%252525252525253Dus.zoom.videomeetings%2525252525252526hl%252525252525253Den"
                >Zoom Webinar App</a
                >. Kindly download it to your device(laptop or phone), for easy
                communication.
            </li>

            <li style="margin-bottom:5px;font-size:0.9em">
                communication.
                <a
                href="https://utiva-dot-yamm-track.appspot.com/Redirect?ukey=1F_0ihH6BFugo7fGaiKdIvV0uCX535CpTBz2Gm6leNCQ-1889823889&key=YAMMID-24425385&link=https%3A%2F%2Futiva-dot-yamm-track.appspot.com%2FRedirect%3Fukey%3D1F_0ihH6BFugo7fGaiKdIvV0uCX535CpTBz2Gm6leNCQ-1151659928%26key%3DYAMMID-88690408%26link%3Dhttps%253A%252F%252Futiva-dot-yamm-track.appspot.com%252FRedirect%253Fukey%253D1F_0ihH6BFugo7fGaiKdIvV0uCX535CpTBz2Gm6leNCQ-1573593702%2526key%253DYAMMID-83841462%2526link%253Dhttps%25253A%25252F%25252Fdrive.google.com%25252Fdrive%25252Ffolders%25252F1Idgf6oPAa0pYePtd6HgVMHOz5zqPjoRd%25253Fusp%25253Dsharing"
                >Here are the Business Cases</a
                >
                you will be working on. Do well to review them before the class
                starts on Saturday.
            </li>

            <li style="margin-bottom:5px;font-size:0.9em">
                At Utiva, we believe <strong>punctuality</strong> is the core of a
                business, so be early for your classes.
            </li>

           ${
             whatsAppLink
               ? `<li style="margin-bottom:5px;font-size:0.9em">
                Kindly join the
                <a href="https://chat.whatsapp.com/FO0WCeE9bKQE6RaBOlPkSX"
                >CLASS CHAT ROOM</a
                >. Please note that this is very important as all your class
                discussions will be taking place here.
            </li>`
               : ''
           }

            <li style="margin-bottom:5px;font-size:0.9em">
                Finally, come with lots of enthusiasm as we've got the best value
                ready to be unveiled.
            </li>
            </ol>

            <div>
            <h3 style="color: #0f078e;">
                Note that ALL the classes are very essential if you want to get
                maximum value.
            </h3>

            <p>
                ${user.firstName},
                please feel free to reach out to me if you have
                any questions or further information.
            </p>

            <p>Best Regards.</p>
            </div>
        </div>
        </div>
        </body>
    </html>
          `;
  return {
    html,
    subject: `Welcome to Utiva Design School, ${user.firstName}!`,
  };
};

const projectManagement = (user, dateObj, whatsAppLink) => {
  const html = `
      <!DOCTYPE html>
      <html lang="en">
          <head>
              <meta charset="UTF-8" />
              <meta http-equiv="X-UA-Compatible" content="IE=edge" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <link rel="preconnect" href="https://fonts.gstatic.com" />
              <link
              href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap"
              rel="stylesheet"
              />
          </head>
          <body>
        <div style="max-width: 600px;padding: 0 15px 30px 15px;margin: auto;box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);background: #f0f5ff;">
        <div style="background: #0f078e;height: 150px;margin-left: -15px;margin-right: -15px;padding: 15px;">
          <img
            src="https://utiva-app.s3.amazonaws.com/utiva-white.png"
            style="width: 80px;"
            alt="logo"
          />
        </div>
        <h3 class="">Dear ${user.firstName}</h3>

        <p>
          Preparations are well underway to ensure an amazing learning experience
          as you come into class on
          ${moment(dateObj.date).format('Do')}.
          However, I need to
          mention a few things:
        </p>
        <div>
          <h3 style="color: #0f078e;">
            Kindly note that the class begins with an orientation session on the
            ${moment(dateObj.date).format('Do MMM YYYY')}
            ${moment(dateObj.time, 'HH:mm:ss').format('hh:mm A')}.
            (More information will be sent to you soon)
          </h3>

          <ol style="margin-bottom: 5px;">
            <li style="margin-bottom:5px;font-size:0.9em">
              It is awesome that you share the start of this journey with your
              LinkedIn connections. This helps to expose you to more opportunities
              in the ecosystem.
            </li>

            <h4 style="color: #0f078e;">
              If you want me to send a short template of a post you can put up, I
              am happy to do that right away.
            </h4>

            <li style="margin-bottom:5px;font-size:0.9em">
              The
              <a href="https://app.utiva.io/">Utiva Learning Platform</a> would be
              your primary platform for class activities. Kindly create an account
              (if you have not) and ensure your profile is updated.
            </li>

            <li style="margin-bottom:5px;font-size:0.9em">
              The Online Classes will be coordinated via the
              <a
                href="https://utiva-dot-yamm-track.appspot.com/Redirect?ukey=1F_0ihH6BFugo7fGaiKdIvV0uCX535CpTBz2Gm6leNCQ-1889823889&key=YAMMID-24425385&link=https%3A%2F%2Futiva-dot-yamm-track.appspot.com%2FRedirect%3Fukey%3D1F_0ihH6BFugo7fGaiKdIvV0uCX535CpTBz2Gm6leNCQ-1151659928%26key%3DYAMMID-88690408%26link%3Dhttps%253A%252F%252Futiva-dot-yamm-track.appspot.com%252FRedirect%253Fukey%253D1F_0ihH6BFugo7fGaiKdIvV0uCX535CpTBz2Gm6leNCQ-1573593702%2526key%253DYAMMID-83841462%2526link%253Dhttps%25253A%25252F%25252Futiva-dot-yamm-track.appspot.com%25252FRedirect%25253Fukey%25253D1y98fSpOCNuBUtltc9eWiEENvi4pzi6oLphMdORRb5d0-2055262072%252526key%25253DYAMMID-77658637%252526link%25253Dhttps%2525253A%2525252F%2525252Futiva-dot-yamm-track.appspot.com%2525252FRedirect%2525253Fukey%2525253D1y98fSpOCNuBUtltc9eWiEENvi4pzi6oLphMdORRb5d0-1340015954%25252526key%2525253DYAMMID-76284796%25252526link%2525253Dhttps%252525253A%252525252F%252525252Futiva-dot-yamm-track.appspot.com%252525252FRedirect%252525253Fukey%252525253D1y98fSpOCNuBUtltc9eWiEENvi4pzi6oLphMdORRb5d0-1602173686%2525252526key%252525253DYAMMID-17174521%2525252526link%252525253Dhttps%25252525253A%25252525252F%25252525252Futiva-dot-yamm-track.appspot.com%25252525252FRedirect%25252525253Fukey%25252525253D1x1UMEGQ0d5MthGgGmJYx3Xgyh75rSPjCp7P5SOaN4Tc-550441438%252525252526key%25252525253DYAMMID-70552994%252525252526link%25252525253Dhttps%2525252525253A%2525252525252F%2525252525252Futivateam-dot-yamm-track.appspot.com%2525252525252FRedirect%2525252525253Fukey%2525252525253D1x1UMEGQ0d5MthGgGmJYx3Xgyh75rSPjCp7P5SOaN4Tc-2038401173%25252525252526key%2525252525253DYAMMID-99730259%25252525252526link%2525252525253Dhttps%252525252525253A%252525252525252F%252525252525252Fplay.google.com%252525252525252Fstore%252525252525252Fapps%252525252525252Fdetails%252525252525253Fid%252525252525253Dus.zoom.videomeetings%2525252525252526hl%252525252525253Den"
                >Zoom Webinar App</a
              >. Kindly download it to your device(laptop or phone), for easy
              communication.
            </li>

            <li style="margin-bottom:5px;font-size:0.9em">
              communication.
              <a
                href="https://utiva-dot-yamm-track.appspot.com/Redirect?ukey=1F_0ihH6BFugo7fGaiKdIvV0uCX535CpTBz2Gm6leNCQ-1889823889&key=YAMMID-24425385&link=https%3A%2F%2Futiva-dot-yamm-track.appspot.com%2FRedirect%3Fukey%3D1F_0ihH6BFugo7fGaiKdIvV0uCX535CpTBz2Gm6leNCQ-1151659928%26key%3DYAMMID-88690408%26link%3Dhttps%253A%252F%252Futiva-dot-yamm-track.appspot.com%252FRedirect%253Fukey%253D1F_0ihH6BFugo7fGaiKdIvV0uCX535CpTBz2Gm6leNCQ-1573593702%2526key%253DYAMMID-83841462%2526link%253Dhttps%25253A%25252F%25252Fdrive.google.com%25252Fdrive%25252Ffolders%25252F1Idgf6oPAa0pYePtd6HgVMHOz5zqPjoRd%25253Fusp%25253Dsharing"
                >Here are the Business Cases</a
              >
              you will be working on. Do well to review them before the class
              starts on Saturday.
            </li>

            <li style="margin-bottom:5px;font-size:0.9em">
              The Class is going to be a practical one where you will be assigned
              a project from the beginning of the class, you will adopt
              lessons/topics learnt each day to solve the project. At the end of
              the Program, you would have developed your own Project Charter. So,
              kindly create a folder in your name
              <a
                href="https://drive.google.com/drive/folders/15ZE5_odHPzoY5svhE4RsOTLr2EzHF0-k?usp=sharing"
                >HERE</a
              >
            </li>

            <li style="margin-bottom:5px;font-size:0.9em">
              You will be working on a Project Management case from the beginning
              of the class. Download your learning materials as well as the
              Project Management Case
              <a
                href="https://drive.google.com/drive/folders/1TFjSGt7znv58tWRkhC_Et_fjwODAD1PO?usp=sharing"
                >HERE</a
              >
            </li>

            <li style="margin-bottom:5px;font-size:0.9em">
              At Utiva, we believe <strong>punctuality</strong> is the core of a
              business, so be early for your classes.
            </li>
          </ol>

          <div>
            ${
              whatsAppLink
                ? `<p>
              One more thing, to ensure effective communication with the rest of
              the class, kindly join your class
              <a href="https://chat.whatsapp.com/FO0WCeE9bKQE6RaBOlPkSX"
                >GROUP CHAT HERE</a
              >
            </p>`
                : ''
            }

            <p>See you in class on ${moment(dateObj.date).format('Do')},
            ${user.firstName}.
            </p>

            <p>Warm Regards.</p>
          </div>
        </div>
      </div>
          </body>
      </html>
            `;
  return {
    html,
    subject: `PM class starts ${moment(dateObj.date).format('Do MMM YYYY')}, ${
      user.firstName
    }! - Important tasks to help you prepare adequately.`,
  };
};

const productSchool = (user, dateObj, whatsAppLink) => {
  const html = `
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8" />
                <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link
                href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap"
                rel="stylesheet"
                />
            </head>
            <body>
            <div style="max-width: 600px;padding: 0 15px 30px 15px;margin: auto;box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);background: #f0f5ff;">
            <div style="background: #0f078e;height: 150px;margin-left: -15px;margin-right: -15px;padding: 15px;">
              <img
                src="https://utiva-app.s3.amazonaws.com/utiva-white.png"
                style="width: 80px;"
                alt="logo"
              />
            </div>
            <h3 class="">Hi ${user.firstName}</h3>

            <p>
              I welcome you to Utiva Product School. We are super excited to have you
              in our prodigious ecosystem. You are the perfect fit for the students we
              want to help build top Tech Solutions in the industry.
            </p>
            <div>
              <h3 style="color: #0f078e;">
                Kindly note that the class begins with an orientation session on the
                ${moment(dateObj.date).format('Do MMM YYYY')}
                ${moment(dateObj.time, 'HH:mm:ss').format('hh:mm A')}.
                (More information will be sent to you soon)
              </h3>

              <h3 style="color: #0f078e;">Kindly take note of the following:</h3>

              <ol style="margin-bottom: 5px;">
                <li style="margin-bottom:5px;font-size:0.9em">
                  Your entire learning experience will be taking place via the
                  <strong>Utiva Learning Platform</strong>. Here, you'll have access
                  to all your learning materials, resources, important class links,
                  post-class recordings, certificates, etc. (Visit app.utiva.io and
                  login your details)
                </li>

                <h4 style="color: #0f078e;">
                  Here is a short
                  <a
                    href="https://utiva-dot-yamm-track.appspot.com/Redirect?ukey=1y98fSpOCNuBUtltc9eWiEENvi4pzi6oLphMdORRb5d0-402738929&key=YAMMID-80415176&link=https%3A%2F%2Futiva-dot-yamm-track.appspot.com%2FRedirect%3Fukey%3D1y98fSpOCNuBUtltc9eWiEENvi4pzi6oLphMdORRb5d0-1420357014%26key%3DYAMMID-04867540%26link%3Dhttps%253A%252F%252Futiva-dot-yamm-track.appspot.com%252FRedirect%253Fukey%253D1y98fSpOCNuBUtltc9eWiEENvi4pzi6oLphMdORRb5d0-671757965%2526key%253DYAMMID-53307613%2526link%253Dhttps%25253A%25252F%25252Futiva-io.zoom.us%25252Frec%25252Fshare%25252FDyGAQJO1uemE1uJnrErt9Zuv93Zg1tq9lDNiG6E4QwRmiTDpgplEZYe5EWuXLvwT.eMiE9IqSyYZp7QWn"
                    >video</a
                  >
                  clip to help you divigate the Learning platform. (It is imperative
                  for you to join the learning platform and update your full profile
                  (picture, LinkedIn, summary, etc)).
                  <strong
                    >Your course mates want to see you, connect with you, and
                    kickstart this learning journey with you).</strong
                  >
                </h4>

                <li style="margin-bottom:5px;font-size:0.9em">
                  To get you ready for class, please watch this
                  <a
                    href="https://utiva-dot-yamm-track.appspot.com/Redirect?ukey=1y98fSpOCNuBUtltc9eWiEENvi4pzi6oLphMdORRb5d0-402738929&key=YAMMID-80415176&link=https%3A%2F%2Futiva-dot-yamm-track.appspot.com%2FRedirect%3Fukey%3D1y98fSpOCNuBUtltc9eWiEENvi4pzi6oLphMdORRb5d0-1420357014%26key%3DYAMMID-04867540%26link%3Dhttps%253A%252F%252Fdrive.google.com%252Fdrive%252Fu%252F1%252Ffolders%252F1ajKPn5ZwhK6e1ecJgOjtr15NAkDA0BZK"
                    >Introductory video</a
                  >
                  by Adeyanju Lawal, Head of Product (EdTech) at Venture Garden Group.
                  With this, you'll understand Product Management, your role as a
                  Product Manager, and how you can transition seamlessly.
                </li>

                <li style="margin-bottom:5px;font-size:0.9em">
                  The Online Classes will be coordinated via the
                  <a
                    href="https://utiva-dot-yamm-track.appspot.com/Redirect?ukey=1F_0ihH6BFugo7fGaiKdIvV0uCX535CpTBz2Gm6leNCQ-1889823889&key=YAMMID-24425385&link=https%3A%2F%2Futiva-dot-yamm-track.appspot.com%2FRedirect%3Fukey%3D1F_0ihH6BFugo7fGaiKdIvV0uCX535CpTBz2Gm6leNCQ-1151659928%26key%3DYAMMID-88690408%26link%3Dhttps%253A%252F%252Futiva-dot-yamm-track.appspot.com%252FRedirect%253Fukey%253D1F_0ihH6BFugo7fGaiKdIvV0uCX535CpTBz2Gm6leNCQ-1573593702%2526key%253DYAMMID-83841462%2526link%253Dhttps%25253A%25252F%25252Futiva-dot-yamm-track.appspot.com%25252FRedirect%25253Fukey%25253D1y98fSpOCNuBUtltc9eWiEENvi4pzi6oLphMdORRb5d0-2055262072%252526key%25253DYAMMID-77658637%252526link%25253Dhttps%2525253A%2525252F%2525252Futiva-dot-yamm-track.appspot.com%2525252FRedirect%2525253Fukey%2525253D1y98fSpOCNuBUtltc9eWiEENvi4pzi6oLphMdORRb5d0-1340015954%25252526key%2525253DYAMMID-76284796%25252526link%2525253Dhttps%252525253A%252525252F%252525252Futiva-dot-yamm-track.appspot.com%252525252FRedirect%252525253Fukey%252525253D1y98fSpOCNuBUtltc9eWiEENvi4pzi6oLphMdORRb5d0-1602173686%2525252526key%252525253DYAMMID-17174521%2525252526link%252525253Dhttps%25252525253A%25252525252F%25252525252Futiva-dot-yamm-track.appspot.com%25252525252FRedirect%25252525253Fukey%25252525253D1x1UMEGQ0d5MthGgGmJYx3Xgyh75rSPjCp7P5SOaN4Tc-550441438%252525252526key%25252525253DYAMMID-70552994%252525252526link%25252525253Dhttps%2525252525253A%2525252525252F%2525252525252Futivateam-dot-yamm-track.appspot.com%2525252525252FRedirect%2525252525253Fukey%2525252525253D1x1UMEGQ0d5MthGgGmJYx3Xgyh75rSPjCp7P5SOaN4Tc-2038401173%25252525252526key%2525252525253DYAMMID-99730259%25252525252526link%2525252525253Dhttps%252525252525253A%252525252525252F%252525252525252Fplay.google.com%252525252525252Fstore%252525252525252Fapps%252525252525252Fdetails%252525252525253Fid%252525252525253Dus.zoom.videomeetings%2525252525252526hl%252525252525253Den"
                    >Zoom Webinar App</a
                  >. Kindly download it to your device(laptop or phone), for easy
                  communication.
                </li>

               ${
                 whatsAppLink
                   ? `<li style="margin-bottom:5px;font-size:0.9em">
                  Kindly join the
                  <a
                    href="https://utiva-dot-yamm-track.appspot.com/Redirect?ukey=1y98fSpOCNuBUtltc9eWiEENvi4pzi6oLphMdORRb5d0-402738929&key=YAMMID-80415176&link=https%3A%2F%2Fchat.whatsapp.com%2FBvZ79BHH6NGJIt9tdbH79m"
                    >CLASS CHAT ROOM</a
                  >. Please note that this is very important as all your class
                  discussions will be taking place here.
                </li>`
                   : ''
               }
              </ol>

              <div>
                <p>
                  At Utiva, we believe <strong>punctuality</strong> is the core of our
                  business, hence, you are required to arrive at class 10 minutes
                  early so you can get a head start.
                </p>

                <p>
                  Finally, come with lots of enthusiasm as we've got the best value
                  for you.
                  <strong
                    >Note that ALL the classes are essential and compulsory if you
                    want to get maximum value.</strong
                  >
                </p>

                <p>
                ${user.firstName}
                , please feel free to reach out to me if you have any questions or further information.</p>

                <p>Warm Regards.</p>
              </div>
            </div>
          </div>
            </body>
        </html>
              `;
  return {
    html,
    subject: `Welcome to Utiva Product Mgt Class, ${user.firstName} | Read Carefully
    `,
  };
};

const bigDataPython = (user, dateObj, whatsAppLink) => {
  const html = `
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8" />
                <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link
                href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap"
                rel="stylesheet"
                />
            </head>
            <body>
      <div style="max-width: 600px;padding: 0 15px 30px 15px;margin: auto;box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);background: #f0f5ff;">
      <div style="background: #0f078e;height: 150px;margin-left: -15px;margin-right: -15px;padding: 15px;">
        <img
          src="https://utiva-app.s3.amazonaws.com/utiva-white.png"
          style="width: 80px;"
          alt="logo"
        />
      </div>
      <h3 class="">Hello ${user.firstName}</h3>

      <p>
        I want to use this opportunity to officially welcome you to the Big Data
        Analytics with Python Program and I trust you are excited to embark on
        this learning journey with us.
      </p>
      <div>
        <h3 style="color: #0f078e;">Kindly take note of the following:</h3>

        <ol style="margin-bottom: 5px;">
          <li style="margin-bottom:5px;font-size:0.9em">
            Your entire learning experience will be taking place via Utiva
            Learning Platform. Here, you'll have access to all your learning
            materials, resources, important class links, post-class recordings,
            assignments etc. (Visit app.utiva.io and login)
          </li>

          <h4 style="color: #0f078e;">
            It is imperative that you sign up on the learning platform and
            update your full profile (picture, LinkedIn profile URL, a short
            bio). Your course mates want to see you, connect with you, and
            kickstart this learning journey with you).
          </h4>

          <li style="margin-bottom:5px;font-size:0.9em">
            On the learning platform under the "Pre-learning session", there are
            two short videos on Introduction to Data Visualization. Please
            ensure you watch the videos before the class begins.
          </li>

          <li style="margin-bottom:5px;font-size:0.9em">
            <p>
              Your live classes will be held on Zoom; the link to join is
              available on the Learning Platform. It is also important that you
              install SQL AND Power BI software on your laptop before coming
              into class.
            </p>

            <div>
              <h3 style="color: #0f078e;">INSTALLATION INSTRUCTIONS</h3>

              <div>
                <h4 style="color: #0f078e;">For Windows OS</h4>
                <ul>
                  <li style="margin-bottom:5px;font-size:0.9em">
                    Click
                    <a
                      href="https://utiva-dot-yamm-track.appspot.com/Redirect?ukey=1aNlMyFCHDMw846ETkygLBSe_VHYEiIAZhhMwC2roTWo-1724844173&key=YAMMID-29220474&link=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3D5mDYijMfSzs"
                      >here</a
                    >
                    to watch how to download the Anaconda and Jupyter Notebook
                    for Python applications.
                  </li>
                  <li style="margin-bottom:5px;font-size:0.9em">
                    Download the latest version that meets your system's
                    requirements.
                  </li>
                </ul>
              </div>

              <div>
                <h4 style="color: #0f078e;">For macOS</h4>
                <ul>
                  <li style="margin-bottom:5px;font-size:0.9em">
                    Click
                    <a
                      href="https://utiva-dot-yamm-track.appspot.com/Redirect?ukey=1aNlMyFCHDMw846ETkygLBSe_VHYEiIAZhhMwC2roTWo-1724844173&key=YAMMID-29220474&link=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DdaVgEXjv6DE"
                      >here</a
                    >
                    to watch how to download the Anaconda and Jupyter Notebook
                    for Python on your Mac OS.
                  </li>
                  <li style="margin-bottom:5px;font-size:0.9em">
                    Download the Python version 3.7, which should run very well
                    on your system.
                  </li>
                </ul>
              </div>
            </div>
          </li>

          <li style="margin-bottom:5px;font-size:0.9em">
            You may need to join your classes from a second screen (perhaps your
            phone). This is important so that you are able to follow the
            facilitator's screen and also practice at the same time.
          </li>

          <li style="margin-bottom:5px;font-size:0.9em">
            Class begins with an orientation session on the
            ${moment(dateObj.date).format('Do MMM YYYY')}
            ${moment(dateObj.time, 'HH:mm:ss').format('hh:mm A')}
            (Nigerian time). More information about this will
            be shared. Endeavour to join in at least 10 minutes earlier so you
            can get a head start
          </li>

          ${
            whatsAppLink
              ? `<li style="margin-bottom:5px;font-size:0.9em">
            Kindly join the
            <a href="https://chat.whatsapp.com/Be3hBog5Q5f514HIAxI2BR"
              >CLASS CHAT ROOM</a
            >. Please note that this is very important as all your class
            discussions will be taking place here.
          </li>

          <li style="margin-bottom:5px;font-size:0.9em">
            Finally, come with lots of enthusiasm as this is the beginning of an
            exciting journey.
          </li>`
              : ''
          }
        </ol>

        <div>
          <p>
            Note that ALL the classes are very essential if you want to get
            maximum value.
          </p>

          <p>
            ${user.firstName}, please feel free to reach out to me if you have
            any questions or further information.
          </p>

          <p>Best Regards.</p>
        </div>
      </div>
    </div>
            </body>
        </html>
              `;
  return {
    html,
    subject: `Welcome to Utiva Data Science Program, ${user.firstName} | Read Carefully`,
  };
};

export default {
  'Data Accelerator': (name, dateObj, whatsAppLink) =>
    dataAccelerator(name, dateObj, whatsAppLink),
  'Project Management': (name, dateObj, whatsAppLink) =>
    projectManagement(name, dateObj, whatsAppLink),
  'Data Incubator': (name, dateObj, whatsAppLink) =>
    dataIncubator(name, dateObj, whatsAppLink),
  'Career Starters Program': (name, dateObj, whatsAppLink) =>
    carrerStarters(name, dateObj, whatsAppLink),
  'Design School': (name, dateObj, whatsAppLink) =>
    designSchool(name, dateObj, whatsAppLink),
  'Product School': (name, dateObj, whatsAppLink) =>
    productSchool(name, dateObj, whatsAppLink),
  'Big Data With Python': (name, dateObj, whatsAppLink) =>
    bigDataPython(name, dateObj, whatsAppLink),
};
