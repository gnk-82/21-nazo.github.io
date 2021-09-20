"use strict";

var app = Vue.createApp({
  data: function data() {
    return {
      correctAnswer: {
        stage1: {
          q1: 'えすおおえす'
        },
        stage2: {
          q1: 'じゃくてんはれいき'
        },
        stage3: {
          q1: 'BLUE'
        },
        stage4: {
          q1: 'BLUE'
        }
      },
      answer: {
        stage1: [false],
        stage2: [false],
        stage3: [false],
        stage4: [false]
      },
      clear: {
        stage1: false,
        stage2: false,
        stage3: false,
        stage4: false
      },
      next: {
        stage1: false,
        stage2: false,
        stage3: false
      }
    };
  },
  methods: {
    answerInput: function answerInput(event, stage, number, _final) {
      this.answer[stage][number - 1] = event;
      var result = this.answer[stage].every(function (element) {
        return element;
      });
      this.clear[stage] = result;

      if (this.clear[stage] === true && _final === 'final') {
        window.location.href = 'final.html';
      }
    },
    nextStage: function nextStage(stage) {
      this.clear[stage] = false;
      this.next[stage] = true;
    }
  }
});
app.component('answer-input', {
  props: ['correct'],
  data: function data() {
    return {
      okMessage: '正解！',
      ngMessage: 'そのキーワードは違うようだ…'
    };
  },
  template: "\n    <div class=\"answer__container\">\n      <div class=\"answer\">\n        <input type=\"text\" v-model=\"inputAnswer\" placeholder=\"\u3053\u3053\u306B\u7B54\u3048\u3092\u5165\u529B\u3057\u3088\u3046\">\n      </div>\n      <p v-if=\"message === ngMessage\" class=\"err-message\">{{ message }}</p>\n      <button v-on:click=\"judgement(inputAnswer)\">\u9001\u4FE1</button>\n      <p v-if=\"message === okMessage\" class=\"err-message\">{{ message }}</p>\n    </div>",
  methods: {
    judgement: function judgement(answer) {
      if (answer === this.correct) {
        this.message = this.okMessage;
        this.$emit('answerInput', true);
      } else {
        this.message = this.ngMessage;
        this.$emit('answerInput', false);
      }
    }
  }
});
app.mount('#stage');