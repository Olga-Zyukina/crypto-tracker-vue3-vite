<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { useRootStore } from "../stores/root"
import { commonService } from "../services";

import AppHeader from "../components/Header.vue";
import AppSidebar from "../components/Sidebar.vue";
import AppMain from "../components/Main.vue";
import AppFooter from "../components/Footer.vue";
import RightSide from "../components/RightSide.vue";

const rootStore = useRootStore();
const news = computed(() => rootStore.news);
const error = computed(() => rootStore.error);

const newsList: any = ref([]);
const loading = ref(true);

const fetchNewsData = async () => {
  loading.value = true;
  if (news.value) {
    Object.values(news.value.slice(0, 20)).forEach((value: any) => {
      const newsItem: any = {
        id: value.id,
        image: value.imageurl,
        title: value.title,
        body: value.body.slice(0, 150) + "..."
      };
      newsList.value.push(newsItem)
    })
    loading.value = false;
  } else {
    throw new Error("No news data available");
  }
}

watch(() => [news.value, error.value], fetchNewsData);

onMounted(async () => {
  commonService.commonFunction();
  fetchNewsData();
});
</script>

<template>
  <AppHeader />
  <AppSidebar />
  <AppMain>
    <template #title>News</template>
    <template #home>
      <section>
        <div class="row">
          <div class="col-lg-8">
            <div v-if="loading && !error" class="d-flex align-items-center justify-content-center py-5">
              <div class="spinner-border text-primary" role="status">
              </div>
            </div>
            <div v-if="error" class="danger">
              <p>{{ error.news }}</p>
            </div>
            <!-- End Loading and Error States -->
            <div v-else class="card">
              <div class="card-body pb-0">
                <h5 class="card-title">Latest News Articles <span>| All time</span></h5>
                <div class="news">
                  <div v-for="news in newsList" :key="news.id" class="post-item clearfix">
                    <img :src="news.image" :alt="news.title" />
                    <h4><a href="/">{{ news.title }}</a></h4>
                    <p>
                      {{ news.body }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- End Left side columns -->
          <div class="col-lg-4">
            <RightSide />
          </div>
          <!-- End Right side columns -->
        </div>
        <!-- End News Grid -->
      </section>
    </template>
  </AppMain>
  <AppFooter />
  <!-- Back to top button -->
  <a href="/" class="back-to-top d-flex align-items-center justify-content-center">
    <i class="bi bi-arrow-up-short"></i>
  </a>
</template>

<style scoped></style>