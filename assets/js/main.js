const app = Vue.createApp({
  data() {
    return {
      correctAnswer: {
        stage1: {
          q1: 'えすおおえす',
        },
        stage2: {
          q1: 'じゃくてんはれいき',
        },
        stage3: {
          q1: 'BLUE',
        },
        stage4: {
          q1: 'きんせい',
        },
        stage5: {
          q1: 'え',
        },
      },

      answer: {
        stage1: [
          false,
        ],
        stage2: [
          false,
        ],
        stage3: [
          false,
        ],
        stage4: [
          false,
        ],
        stage5: [
          false,
        ],
      },

      clear: {
        stage1: false,
        stage2: false,
        stage3: false,
        stage4: false,
        stage5: false,  
      },
      next: {
        stage1: false,
        stage2: false,
        stage3: false,
        stage4: false,  
      },
    }
  },
  methods: {
    answerInput(event, stage, number, final) {
      this.answer[stage][number-1] = event;
      const result = this.answer[stage].every((element) => {
        return element;
      });
      this.clear[stage] = result;
      if ( this.clear[stage] === true && final === 'final' ) {
        window.location.href = 'final.html';
      }
    },
    nextStage(stage) {
      this.clear[stage] = false;
      this.next[stage] = true;
    },
  }
})

app.component('answer-input', {
  props: ['correct'],
  data: function () {
    return {
      okMessage: '正解！',
      ngMessage: 'そのキーワードは違うようだ…',
    }
  },
  template: `
    <div class="answer__container">
      <div class="answer">
        <input type="text" v-model="inputAnswer" placeholder="ここに答えを入力しよう">
      </div>
      <p v-if="message === ngMessage" class="err-message">{{ message }}</p>
      <button v-on:click="judgement(inputAnswer)">送信</button>
      <p v-if="message === okMessage" class="err-message">{{ message }}</p>
    </div>`,
  methods: {
    judgement(answer) {
      if(answer === this.correct) {
        this.message = this.okMessage;
        this.$emit('answerInput', true);
      } else {
        this.message = this.ngMessage;
        this.$emit('answerInput', false);
      }
    },
  }
})

app.mount('#stage')
