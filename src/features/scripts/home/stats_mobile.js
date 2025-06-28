import { gsap } from 'gsap'

function stats_mobile() {
  const acc_blocks = document.querySelectorAll('.stat-block')
  const titles = document.querySelectorAll('.acc-title')
  const blocks = document.querySelectorAll('.stats_block')

  let duration = 0.4

  const expandedHeights = []
  let expandedHeight = window.innerHeight * 0.28 + 40
  let collapsedHeight = 0

  acc_blocks.forEach((block, index) => {
    const rect = block.getBoundingClientRect()
    expandedHeights[index] = rect.height
  })

  const rect = titles[0].getBoundingClientRect()
  collapsedHeight = rect.height + 24

  gsap.set(acc_blocks, {
    height: collapsedHeight,
  })

  titles.forEach((title, index) => {
    title.addEventListener('click', () => {
      // Collapse all
      gsap.to(acc_blocks, {
        height: collapsedHeight,
        duration: duration,
      })
      gsap.to(blocks, {
        opacity: 0,
        duration: duration,
      })
      // Expand current title
      gsap.to(acc_blocks[index], {
        height: expandedHeight,
        duration: duration,
      })
      // blocks[index].style.display = 'flex'
      gsap.to(blocks[index], {
        opacity: 1,
        duration: duration,
      })
    })
  })
}

export default stats_mobile
