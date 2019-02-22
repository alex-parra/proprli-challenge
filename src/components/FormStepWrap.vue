<template>
  <div :class="'formStep step-'+ step">

    <div class="steps">
      <span v-for="s in [1,2,3,4,5]" :class="s == step ? 'current' : ''" :key="s">Step {{s}}</span>
    </div>

    <h2>{{title}}</h2>

    <div class="fields">
      <slot></slot>
    </div>

    <div class="formStepBtns btns">
      <btn :classes="['goBack', 'btn-sm']" :handleClick="goBack" :text="'Back'" />
      <btn :classes="['nextStep','btn-main']" :handleClick="goToNextStep" :text="nextText" />
    </div>

  </div>
</template>

<script lang="ts">
  import Vue from 'vue'

  export default Vue.extend({
    name: 'FormStepWrap',
    props: ['step', 'title', 'handleNext', 'nextBtnText'],
    computed: {
      nextStep(): number {
        return this.step + 1
      },
      nextText(): string {
        return this.nextBtnText || 'Continue to Step ' + this.nextStep
      }
    },
    methods: {
      goToNextStep() {
        if (this.handleNext) {
          this.handleNext()
        } else {
          this.$router.push({name: 'form-step-' + this.nextStep})
        }
      },
      goBack() {
        this.$router.go(-1)
      }
    }
  })
</script>

<style lang="scss">

  .formStep {
    display: flex;
    flex-direction: column;
    min-height: 40vh;
    > h2 {
      flex: 0 0 auto;
      font-size: 2.5rem;
    }
    .fields {
      flex: 1;
    }
    > .formStepBtns {
      flex: 0 0 auto;
    }
  }

  .steps {
    display: flex;
    justify-content: space-between;
    position: relative;
    margin-bottom: 20px;
    &::before {
      content: "";
      position: absolute;
      z-index: 0;
      left: -20px;
      right: -20px;
      top: 50%;
      transform: translate(0,-50%);
      height: 2px;
      background-color: #f4f4f4;
    }
    span {
      background-color: #fff;
      border-radius: 100px;
      cursor: default;
      display: inline-block;
      font-size: 11px;
      font-weight: bold;
      line-height: 1.1;
      padding: 3px 10px 2px;
      position: relative;
      text-transform: uppercase;
      z-index: 1;
      &.current {
        color: #fff;
        background-color: #008000;
      }
    }
  }

  .formStepBtns {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 40px 10px 20px;
    font-size: 1.6rem;
    border-top: 1px solid #ddd;
    margin: 40px 0 0;

    .btn {
      margin: 0 10px;
      &.nextStep {
        font-size: 20px;
      }
    }
  }

  .btn.goBack {
    position: relative;
    padding-left: 25px;
    &::before {
      content: "";
      border: 5px solid transparent;
      border-right-color: currentColor;
      opacity: .7;
      position: absolute;
      top: 50%;
      left: 0;
      transform: translate(50%, -50%);
    }
  }
</style>
