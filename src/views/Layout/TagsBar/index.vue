<template>
  <scroll-pane class='tags-view-container' ref='scrollPane'>
    <router-link ref='tag' class="tags-view-item" :class="isActive(tag)?'active':''" v-for="tag in visitedViews" :to="tag.path" :key="tag.path">
      {{ tag.title }}
      <span class='el-icon-close' @click='closeViewTags(tag,$event)'></span>
    </router-link>
  </scroll-pane>
</template>

<script>
  import ScrollPane from './ScrollPanel';

  export default {
    data() {
      return {
        visitedViews: [],
      };
    },
    components: { ScrollPane },
    mounted() {
      this.addViewTags();
    },
    methods: {
      closeViewTags(view, $event) {
        for (const [i, v] of this.visitedViews.entries()) {
          if (v.path === view.path) {
            this.visitedViews.splice(i, 1);
            break;
          }
        }
        if (this.isActive(view)) {
          const latestView = this.visitedViews.slice(-1)[0];
          // console.log('latestView', latestView);
          if (latestView) {
            this.$router.push(latestView.path);
          } else {
            this.$router.push('/main/dashboard');
            this.addViewTags();
          }
        }
        $event.preventDefault();
      },
      generateRoute() {
        if (this.$route.name) {
          return this.$route;
        }
        return false;
      },
      addViewTags() {
        const route = this.generateRoute();
        if (!route) {
          return false;
        }
        if (this.visitedViews.some(v => v.path === route.path)) return;
        this.visitedViews.push({
          name: route.name,
          path: route.path,
          title: route.meta.title || 'no-name'
        });
      },
      isActive(route) {
        return route.path === this.$route.path || route.name === this.$route.name;
      },
      moveToCurrentTag() {
        const tags = this.$refs.tag;
        this.$nextTick(() => {
          for (const tag of tags) {
            if (tag.to === this.$route.path) {
              this.$refs.scrollPane.moveToTarget(tag.$el);
              break;
            }
          }
        });
      }
    },
    watch: {
      $route() {
        this.addViewTags();
        this.moveToCurrentTag();
      }
    }
  };
</script>

<style scoped>
  .tags-view-container {
    background: #fff;
    height: 30px;
    box-sizing: border-box;
    border-bottom: 1px solid #d8dce5;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  }

  .tags-view-container .tags-view-item {
    display: inline-block;
    position: relative;
    height: 26px;
    line-height: 26px;
    border: 1px solid #d8dce5;
    background: #fff;
    padding: 0 8px;
    font-size: 12px;
    margin-left: 5px;
    margin-top: 4px;
    text-decoration: none;
    font-weight: bold;
    color: #666;
  }

  .tags-view-container .tags-view-item:first-of-type {
    margin-left: 15px;
  }

  .tags-view-container .tags-view-item.active {
    background-color: #45a0ff;
    color: #fff;
    border-color: rgb(107, 154, 255);

  }

  .tags-view-container .tags-view-item.active::before {
    content: "";
    background: #fff;
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    position: relative;
    margin-right: 2px;
  }
</style>

<style>
  .tags-view-container .tags-view-item .el-icon-close {
    width: 16px;
    height: 16px;
    vertical-align: 2px;
    border-radius: 50%;
    text-align: center;
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    transform-origin: 100% 50%;
  }

  .tags-view-container .tags-view-item .el-icon-close:before {
    transform: scale(0.6);
    display: inline-block;
    vertical-align: -3px;
  }

  .tags-view-container .tags-view-item .el-icon-close:hover {
    background-color: #b4bccc;
    color: #fff;
  }
</style>
