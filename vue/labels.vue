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
       <page-head :title="'故事分类'"></page-head>
       <div class="body scroll-container" ref="body">
           <div class="labels">
                <div class="dimension" v-for="(item, index) in labels" :key="item.icon">
                    <div class="dim">
                        <div class="dim-icon"><img :src="`${config.SERVER}/image/` + item.icon"></div>
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
    import PageHead from './components/header.vue';
    import IScroll from '../../common/iscroll';
    import config from '../js/config';

    export default {
        components: {
            PageHead
        },
        props: [

        ],
        data: function() {
            return {
                config,
                labels: []
            };
        },

        created: async function () {
            const allLabels = await this.appDao.listAllLabels();
            this.labels = allLabels;
            this.$nextTick(() => {
                new IScroll(this.$refs.body, {
                    tap: true
                });
            });

        },

        mounted: function() {
            
        },

        methods: {
            openLabel: function(item) {
                this.$emit('openlabel', item);
            }
        },
    }

</script>


