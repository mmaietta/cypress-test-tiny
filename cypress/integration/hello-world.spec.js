import { mount } from '@cypress/vue'
import HelloWorld from './HelloWorld.vue'

describe('HelloWorld', () => {
  it('renders a message', () => {
    const msg = 'Hello Cypress Component Testing!'
    mount(HelloWorld, {
      propsData: {
        msg
      }
    })

    cy.get('h1').should('have.text', msg)
  })
})

// import { mountCallback } from '@cypress/vue'

// describe('Handling User Input', () => {
//   // Example from https://vuejs.org/v2/guide/#Handling-User-Input
//   const template = `
//     <div>
//       <p>{{ message }}</p>
//       <button @click="reverseMessage">Reverse Message</button>
//     </div>
//   `

//   function data() {
//     return { message: 'Hello Vue.js!' }
//   }

//   const methods = {
//     reverseMessage: function () {
//       this.message = this.message.split('').reverse().join('')
//     },
//   }

//   beforeEach(mountCallback({ template, data, methods }))

//   it('reverses text', () => {
//     cy.contains('Hello Vue')
//     cy.get('button').click()
//     cy.contains('!sj.euV olleH')
//   })
// })