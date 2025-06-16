import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'

gsap.registerPlugin(ScrollTrigger)

// Split and coordinate text with 3D cam

function splitClub() {
  // ELEMENTS
  // Camera heading
  const cam_p = document.querySelector('.cam-p')
  const heading_wrapper = document.querySelector('.heading-cont')
  // Camera features
  const cam_features = document.querySelectorAll('.cam-p-2')
  const cam_feature_headings = document.querySelectorAll('.cam-p-heading')
  const cam_feature_wrappers = document.querySelectorAll('.cam-p-wrapper')
  // Padmi features
  const padmi_features_p = document.querySelectorAll('.elements-txt')
  const padmi_features_h = document.querySelectorAll('.elements-title')
  // Padmi features IMGS
  const img = document.querySelectorAll('.club-img')

  // const splitHeading = new SplitType(cam_heading, { types: 'lines' })
  const splitHeadingP = new SplitType(cam_p, { types: 'lines' })

  // HEADINGS
  function splitHeadings() {
    // Main heading
    // splitHeading.lines.forEach((line) => {
    //   const wrapper = document.createElement('div')
    //   wrapper.style.overflow = 'visible'
    //   wrapper.style.display = 'block'
    //   wrapper.style.height = '1em'

    //   line.parentNode.insertBefore(wrapper, line)
    //   wrapper.appendChild(line)
    // })

    // Paragraph
    splitHeadingP.lines.forEach((line) => {
      const wrapper = document.createElement('div')
      wrapper.style.overflow = 'hidden'
      wrapper.style.display = 'block'
      wrapper.style.height = '1.2em'

      line.parentNode.insertBefore(wrapper, line)
      wrapper.appendChild(line)
    })
  }

  function animateHeadings() {
    gsap.to(heading_wrapper, {
      opacity: 1,
      duration: 0.8,
    })
    // gsap.from([splitHeading.lines, splitHeadingP.lines], {
    //   opacity: 0,
    //   yPercent: 100,
    //   duration: 1,
    //   ease: 'power1.out',
    //   stagger: 0.2,
    // })
  }
  splitHeadings()
  animateHeadings()

  // CAMERA FEATURES
  function splitAnimateCamFeatures() {
    cam_feature_headings.forEach((heading) => {
      const wrapper = document.createElement('div')
      wrapper.style.overflow = 'hidden'
      wrapper.style.display = 'block'
      heading.parentNode.insertBefore(wrapper, heading)
      wrapper.appendChild(heading)

      gsap.from(heading, {
        opacity: 0,
        yPercent: 100,
        duration: 1,
        ease: 'power1.out',
        scrollTrigger: {
          trigger: heading,
          start: 'top 80%',
          end: 'top 85%',
          markers: false,
        },
      })
    })

    cam_features.forEach((feature) => {
      const splitFeature = new SplitType(feature, { types: 'lines' })
      splitFeature.lines.forEach((line) => {
        const wrapper = document.createElement('div')
        wrapper.style.overflow = 'hidden'
        wrapper.style.display = 'block'

        line.parentNode.insertBefore(wrapper, line)
        wrapper.appendChild(line)
      })
      gsap.from(splitFeature.lines, {
        opacity: 0,
        yPercent: 100,
        duration: 1,
        ease: 'power1.out',
        stagger: 0.2,
        scrollTrigger: {
          trigger: feature,
          start: 'top 80%',
          end: 'top 85%',
          markers: false,
        },
      })
    })

    cam_feature_wrappers.forEach((wrapper) => {
      gsap.to(wrapper, {
        scrollTrigger: {
          trigger: wrapper,
          start: 'center 50%',
          end: 'top -50%',
          pin: wrapper,
          pinSpacer: true,
          anticipatePin: true,
        },
      })
      gsap.to(wrapper, {
        opacity: 0,
        scrollTrigger: {
          trigger: wrapper,
          start: 'top 40%',
          end: 'top top',
          scrub: true,
        },
      })
    })
  }
  splitAnimateCamFeatures()

  // PADMI FEATURES
  function splitAnimatePadmiFeatures() {
    padmi_features_h.forEach((heading) => {
      const wrapper = document.createElement('div')
      wrapper.style.overflow = 'hidden'
      wrapper.style.display = 'block'
      heading.parentNode.insertBefore(wrapper, heading)
      wrapper.appendChild(heading)

      gsap.from(heading, {
        opacity: 0,
        yPercent: 100,
        duration: 0.8,
        ease: 'power1.out',
        scrollTrigger: {
          trigger: heading,
          start: 'top 80%',
          end: 'top 85%',
          markers: false,
        },
      })
    })

    padmi_features_p.forEach((feature) => {
      const splitPadmiFeature = new SplitType(feature, { types: 'lines' })
      splitPadmiFeature.lines.forEach((line) => {
        const wrapper = document.createElement('div')
        wrapper.style.overflow = 'hidden'
        wrapper.style.display = 'block'

        line.parentNode.insertBefore(wrapper, line)
        wrapper.appendChild(line)
      })
      gsap.from(splitPadmiFeature.lines, {
        opacity: 0,
        yPercent: 100,
        duration: 1,
        ease: 'power1.out',
        stagger: 0.2,
        scrollTrigger: {
          trigger: feature,
          start: 'top 80%',
          end: 'top 85%',
          markers: false,
        },
      })
    })
  }
  splitAnimatePadmiFeatures()

  function parallax() {
    img.forEach((img) => {
      gsap.to(img, {
        y: 16,
        scrollTrigger: {
          trigger: img,
          start: 'top bottom',
          end: 'top top',
          scrub: true,
          markers: false,
        },
      })
    })
  }
  parallax()
}

export default splitClub
