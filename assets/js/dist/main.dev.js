"use strict";

/**********************************************************************************************************
 * 解答入力欄のコンポーネントです。入力欄・送信ボタン・エラーメッセージを表示します。
 * <answer-input v-bind:correct="解答" v-on:answer-input="answerInput(event, stage, number, final)"></answer-input>
 * 解答：correctAnswer['stage1']['q1']
 * answerInput(event, stage, number, final)：
 *          event ：$event
 *          stage ：STAGE名 'stage1'
 *          number：問題番号（数字） 1
 *          final ：最終ステージの場合 'final'
 *********************************************************************************************************/
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
          q1: 'ううう'
        }
      },

      /* それぞれの問題が正解かどうか
      *  ex. 問題2-3を追加する場合は配列にfalseを追加します。
      */
      answer: {
        stage1: [false],
        stage2: [false // 2-1
        // false, // 2-2
        // false, // 2-3
        ],
        stage3: [false // 3-1
        // false, // 3-2
        // false, // 3-3
        ]
      },

      /* ステージの問題が全て正解かどうか */
      clear: {
        stage1: false,
        stage2: false,
        stage3: false
      },

      /* 次のステージを表示するかどうか
      *  最終ステージはページを遷移するので設定不要です。
      */
      next: {
        stage1: false,
        stage2: false
      }
    };
  },
  methods: {
    /* 「送信」ボタンをクリックした場合の動作です。 */
    answerInput: function answerInput(event, stage, number, _final) {
      /* answerをtrueまたはfalseにします。 */
      this.answer[stage][number - 1] = event;
      /* STAGEのすべての問題がtrueか調べてclearの値を変更します。*/

      var result = this.answer[stage].every(function (element) {
        return element;
      });
      this.clear[stage] = result;
      /* 最終ステージの入力を判定します。 */

      if (this.clear[stage] === true && _final === 'final') {
        window.location.href = 'final.html';
      }
    },

    /* クリア画面「次のステージへ」ボタンをクリックした時の動作を設定します
    *  clearをfalseにしてクリア画面を非表示にします。
    *  nextをtrueにして次のステージを表示します。
    */
    nextStage: function nextStage(stage) {
      this.clear[stage] = false;
      this.next[stage] = true;
    }
  }
});
/* 解答入力欄のコンポーネント */

app.component('answer-input', {
  props: ['correct'],
  data: function data() {
    return {
      /* 送信ボタン上下に表示されるメッセージ */
      okMessage: '正解！',
      ngMessage: 'そのキーワードは違うようだぞ！？',
      message: '',
      inputAnswer: ''
    };
  },
  template: "\n    <div class=\"answer__container\">\n      <div class=\"answer\">\n        <input type=\"text\" v-model=\"inputAnswer\" placeholder=\"\u3053\u3053\u306B\u7B54\u3048\u3092\u5165\u529B\u3057\u3088\u3046\">\n      </div>\n      <p v-if=\"message === ngMessage\" class=\"err-message\">{{ message }}</p>\n      <button v-on:click=\"judgement(inputAnswer)\">\u9001\u4FE1</button>\n      <p v-if=\"message === okMessage\" class=\"err-message\">{{ message }}</p>\n    </div>",
  methods: {
    judgement: function judgement(answer) {
      if (answer === this.correct) {
        // 入力値が解答と一致する場合
        this.message = this.okMessage;
        this.$emit('answerInput', true);
      } else {
        // 一致しない場合
        this.message = this.ngMessage;
        this.$emit('answerInput', false);
      }
    }
  }
});
app.mount('#stage');