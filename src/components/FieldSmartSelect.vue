<template>
  <div class="smartSelect">

    <div class="active" @click="toggle" tabindex="0">
      {{selectedText}}
    </div>
    <div class="options" v-if="isOpen">
      <div class="search" v-if="showSearch">
        <input v-focus placeholder="Search options..." v-model="search" />
      </div>
      <div class="opt" v-for="(opt, k) in selectOptions" @click="setSelected(opt)" :key="k">
        {{opt.label}}
      </div>
    </div>

  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import _ from 'lodash'

  export default Vue.extend({
    name: 'FieldSmartSelect',
    props: ['options', 'active', 'defaultText', 'searchable', 'handleSelect'],
    data: () => ({
      selected: null,
      isOpen: false,
      search: ''
    }),
    computed: {
      showSearch(): boolean {
        return this.searchable || this.options.length > 4
      },
      selectedText(): string {
        return this.selected || this.defaultText || '- Select -'
      },
      selectOptions(): any[] {
        let opts = []
        for (let opt of this.options) {
          const label = opt.text || opt
          opts.push({label: label, opt: opt})
        }
        if (this.search.length > 0) {
          var searchRegex = new RegExp(_.escapeRegExp(this.search), 'i');
          opts = _.filter(opts, function(o) {
            return searchRegex.test(_.deburr(o.label))
          });
        }
        return opts
      }
    },
    methods: {
      toggle() {
        this.isOpen = !this.isOpen
      },
      setSelected(option: any) {
        this.selected = option.label
        this.handleSelect(option.opt)
        this.search = ''
        this.toggle()
      }
    },
    created() {
      if (this.active) {
        this.selected = this.active
      }
    },
    directives: {
      focus: {
        inserted(el) {
          el.focus()
        }
      }
    }
  })
</script>

<style scoped lang="scss">
  .smartSelect {
    position: relative;
    border: 1px solid #ddd;
    border-radius: 3px;
  }

  .active {
    padding: .5em 1em;
    cursor: pointer;
    font-size: 1.6rem;
    position: relative;
    &::after {
      content: '';
      border: 5px solid transparent;
      border-top-color: #999;
      position: absolute;
      right: 4px;
      top: 50%;
      transform: translate(-50%, -25%);
    }
  }

  .options {
    position: absolute;
    z-index: 9999;
    left: 1px;
    top: 100%;
    right: 1px;
    background-color: #eee;
    border: 1px solid #ddd;
    border-radius: 0 0 3px 3px;
  }

  .opt {
    padding: .4em 1em;
    font-size: .9em;
    &:hover {
      cursor: pointer;
      background-color: rgba(255, 255, 255, .5)
    }
    & + .opt {
      border-top: 1px solid #eee;
    }
  }

  .search {
    padding: 3px;
    input {
      font-size: .8em;
    }
  }
</style>
