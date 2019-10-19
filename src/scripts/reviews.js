import Vue from 'vue'
import Flickity from 'vue-flickity'
import axios from 'axios'

const review = {
  template: '#review-template',
  props: {
    review: Object
  }
}

new Vue({
  el: '#reviews',
  template: '#reviews-template',
  components: {
    Flickity,
    review
  },
  data: {
    reviews: [],
    flickityOptions: {
      initialIndex: 0,
      prevNextButtons: true,
      pageDots: false,
      wrapAround: false,
      groupCells: true

      // any options from Flickity can be used
    },
    currentIndex: 0
  },
  methods: {
    onInit() {
      this.$refs.flickity.on('change', (event) => {
        this.currentIndex = event

        if (!this.$refs.flickity.$flickity.nextButton.isEnabled)
          this.currentIndex = this.reviews.length
      })
    },
    makeArrWithAbsoluteImages(data) {
      return data.map((item) => {
        const requiredPic = `https://webdev-api.loftschool.com/${item.photo}`
        item.avatar = requiredPic

        return item
      })
    },
    next() {
      this.$refs.flickity.next()
    },

    previous() {
      this.$refs.flickity.previous()
    }
  },
  created() {
    axios
      .get('https://webdev-api.loftschool.com/reviews/148')
      .then((response) => {
        console.log(response)
        const data = response.data
        this.reviews = this.makeArrWithAbsoluteImages(data)
        console.log('REVIEWS ==>', this.reviews.length)
      })
  }
})
