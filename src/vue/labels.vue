<style lang="less">
  .labels {
    .dimension {
        font-size: 4vw;
        background: #fff;
        margin: 1vh 0vh;
        border-bottom: 1px solid #eee;
      .dim {
        .dim-text {
            color: #666;
            font-size: 20px;
            padding: 10px;
        }
      }
      .labels {
        display: flex;
        flex-wrap: wrap;
        padding-bottom: 16px;
        .label {
            color: #666;
            font-size: 16px;
            padding: 5px 10px;
            margin: 5px;
            border-radius: 20px;
            border: 1px solid #8bd17b;
        }
      }
    }
  }
</style>

<template>
   <div class="fs">
       <div class="header">
           <router-link to="/home" tag="i" replace class="icon-left-open">
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
                this.$router.replace('/label/' + item);
            }
        },
    }

</script>


