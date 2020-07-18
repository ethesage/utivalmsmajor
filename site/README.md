# react-package-broiler-plate

Run npm i to install
npm run dev, to start development server

```
To view media and color map
Go to the _media.scss file
```

```
To view the basic styles go to
index.scss
```

Put your actions and reducers in the same folder as the component.
Like I did with the loader

put coustom hooks in the Hooks folder.
I have a little hook called useCarousel there.

## The basic styles are
### for flex styles

```
.flex {
  display: flex;
}

.flex-row {
  display: flex;
  justify-content: center;
  align-items: center;
}

.flex-col {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.row-reverse {
  flex-direction: row-reverse;
}

.col-reverse {
  flex-direction: column-reverse;
}

.j-start {
  justify-content: flex-start;
}

.j-end {
  justify-content: flex-end;
}

.j-space {
  justify-content: space-between;
}

.al-start {
  align-items: flex-start;
}

.al-end {
  align-items: flex-end;
}

.al-bet {
  align-content: space-between;
}
```

### image and video

```
.img,
svg {
  width: 100%;
  height: 100%;
}

.cover {
  object-fit: cover;
}

.contain {
  object-fit: contain;
}

color styles

.theme-color {
  color: color(theme);
  fill: color(theme);
}

.secondary-color {
  color: color(secondary);
  fill: color(secondary);
}
```

### general styles

```
.clipped-text {
  display: -webkit-box;
  -webkit-line-clamp: var(--number);
  -webkit-box-orient: vertical;
  overflow-y: hidden;
  text-overflow: ellipsis;
  hyphens: auto;
}

.txt-center {
  text-align: center;
}

.container {
  width: 1300px;
  margin: auto;

  @include for-size(desktop-up) {
    width: 1100px;
  }

  @include for-size(smaller-desktop) {
    width: 90%;
  }
}

.full-center {
  display: grid;
  align-items: center;
}

.centered {
  display: grid;
  place-content: center;
}

%centered {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.absolute-center {
  @extend %centered;
}

.before {
  @extend %centered;
}

ul,
li {
  list-style: none;
}

.read-more {
  color: color(theme);
  font-size: 0.9em;
}

.underline {
  border-bottom: 1px solid black;
}

.card {
  @include for-size(phone-only) {
    flex-direction: column;
  }

  .img-sec,
  .text-sec {
    width: 50%;

    @include for-size(phone-only) {
      width: 90%;
    }
  }

  &.var {
    .img-sec,
    .text-sec {
      width: unset;

      @include for-size(phone-only) {
        width: 90%;
      }
    }
  }
}

.m-150 {
  margin-top: 150px;
}

.inblock {
  display: inline-block;
}

.m-150 {
  margin-top: 150px;
}

.block {
  display: block;
}

.mx-auto {
  margin: 0 auto;
}

.my-auto {
  margin: auto 0;
}

.m-auto {
  margin: auto;
}
```
