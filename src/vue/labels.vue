<style lang="less">
  .labels {
    .dimension {
        font-size: 4vw;
        background: #fff;
        margin: 1vh 0vh;
        border-bottom: 1px solid #eee;
      .dim {
        .dim-icon {
          width: 10vw;
          height: 10vw;
          margin: 1vh auto;
        }
        .dim-text {
          color: #666;
        }
      }
      .labels {
        flex: 3;
        display: flex;
        border-left: 1px solid #eee;
        flex-wrap: wrap;
        .label {
          padding: 3vh 0;
          border-bottom: 1px solid #eee;
          width: 33.3%;
          border-right: 1px solid #eee;
          font-size: 4vw;
          box-sizing: border-box;
        }
      }
    }
  }
</style>

<template>
   <div class="fs">
       <div class="header">
           <router-link to="/home" tag="i" class="icon-left-open">
           </router-link>
           <div class="title">故事分类</div>
       </div>
       <div class="full-scroll-container" ref="scroll">
           <div class="labels">
                <div class="dimension" v-for="(item, index) in labels" :key="item.icon">
                    <div class="dim">
                        <div class="dim-text">{{item.dim}}</div>
                    </div>
                    <div class="labels">
                        <div class="label" v-for="label in item.list" @tap="openLabel(label)" :key="label">
                            {{label}}
                        </div>
                    </div>
                </div>
           </div>
       </div>
    </div>
</template>

<script>
    import commonMixins from '../js/common';

    export default {
        components: {
        },
        mixins: [commonMixins],
        props: [

        ],
        data: function() {
            return {
                labels: []
            };
        },

        created: async function () {
            const allLabels = await this.appDao.listAllLabels();
            this.labels = allLabels;

        },

        mounted: function() {
            this.$nextTick(()=> {
                this.scroll(this.$refs.scroll);
            })
        },

        methods: {
            openLabel: function(item) {
                this.$emit('openlabel', item);
            }
        },
    }

</script>


