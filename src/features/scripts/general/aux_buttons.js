import { gsap } from 'gsap'
import SplitType from 'split-type'

function aux_buttons() {
  const button_wrapper_ty = document.querySelector('.download-h-wrapper-ty')
  const txt_ty = document.querySelector('.download-heading-ty')
  const txt_hidden_ty = txt_ty.nextElementSibling

  const splitTxtTy = new SplitType(txt_ty, {
    types: 'chars',
  })
  const splitTxtTyHidden = new SplitType(txt_hidden_ty, {
    types: 'chars',
  })

  const stag = 0.016

  button_wrapper_ty.addEventListener('mouseenter', () => {
    gsap.to(splitTxtTy.chars, {
      yPercent: -102,
      duration: 0.4,
      ease: 'power1.out',
      stagger: stag,
    })
    gsap.to(splitTxtTyHidden.chars, {
      yPercent: -100,
      duration: 0.4,
      ease: 'power1.out',
      stagger: stag,
    })
  })
  button_wrapper_ty.addEventListener('mouseleave', () => {
    gsap.to(splitTxtTy.chars, {
      yPercent: 0,
      duration: 0.4,
      ease: 'power2.out',
      stagger: stag,
    })

    gsap.to(splitTxtTyHidden.chars, {
      yPercent: 0,
      duration: 0.4,
      ease: 'power2.out',
      stagger: stag,
    })
  })
}

export default aux_buttons
