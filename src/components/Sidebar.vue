<script setup lang="ts">
import { CRYPTO_INFO } from "../constants/utils";
const cryptoList = Object.keys(CRYPTO_INFO).sort((a: any, b: any) => a.toLowerCase().localeCompare(b.toLowerCase()));
</script>

<template>
  <aside id="sidebar" class="sidebar">
    <ul class="sidebar-nav" id="sidebar-nav">
      <li class="nav-item">
        <RouterLink :to="{ name: 'home' }" class="nav-link collapsed" active-class="active">
          <i class="bi bi-grid"></i>
          <span>Dashboard</span>
        </RouterLink>
      </li>
      <!-- End Dashboard Nav -->

      <li class="nav-item">
        <a class="nav-link collapsed" data-bs-target="#components-nav" data-bs-toggle="collapse" href="/">
          <i class="bi bi-menu-button-wide"></i><span>PriceChart</span><i class="bi bi-chevron-down ms-auto"></i>
        </a>
        <ul id="components-nav" class="nav-content collapse" data-bs-parent="#sidebar-nav">
          <li v-for="cryptoItem in cryptoList" :key="cryptoItem">
            <RouterLink :to="{name:'chart', params:{id:cryptoItem}}">
              <i class="bi bi-circle"></i><span>{{ cryptoItem }}</span>
            </RouterLink>
          </li>
        </ul>
      </li>
      <!-- End PriceChart Nav -->

      <li class="nav-item">
        <RouterLink :to="{ name: 'cap' }" class="nav-link collapsed" active-class="active">
          <i class="bi bi-journal-text"></i>
          <span>MarketCap</span>
        </RouterLink>
      </li>
      <!-- End Market Cap -->

      <li class="nav-item">
        <RouterLink :to="{ name: 'price'}" class="nav-link collapsed" active-class="active">
          <i class="bi bi-layout-text-window-reverse"></i>
          <span>PriceGainers</span>
        </RouterLink>
      </li>
      <!-- End PriceGainers -->

      <li class="nav-item">
        <RouterLink :to="{ name: 'news' }" class="nav-link collapsed" active-class="active">
          <i class="bi bi-bar-chart"></i>
          <span>CryptoNews</span>
        </RouterLink>
      </li>
      <!-- End Charts Nav -->

      <li class="nav-heading">Pages</li>

      <li class="nav-item">
        <RouterLink :to="{ name: 'userprofile' }" class="nav-link collapsed" active-class="active">
          <i class="bi bi-grid"></i>
          <span>Profile</span>
        </RouterLink>
      </li>
      <!-- End Profile Page Nav -->

      <li class="nav-item">
        <RouterLink :to="{ name: 'faq' }" class="nav-link collapsed" active-class="active">
          <i class="bi bi-question-circle"></i>
          <span>F.A.Q</span>
        </RouterLink>
      </li>
      <!-- End F.A.Q Page Nav -->

      <li class="nav-item">
        <RouterLink :to="{ name: 'contact' }" class="nav-link collapsed" active-class="active">
          <i class="bi bi-envelope"></i>
          <span>Contact</span>
        </RouterLink>
      </li>
      <!-- End Contact Page Nav -->

      <li class="nav-item">
        <RouterLink :to="{ name: 'register' }" class="nav-link collapsed" active-class="active">
          <i class="bi bi-card-list"></i>
          <span>Register</span>
        </RouterLink>
      </li>
      <!-- End Register Page Nav -->

      <li class="nav-item">
        <RouterLink :to="{ name: 'register' }" class="nav-link collapsed" active-class="active">
          <i class="bi bi-box-arrow-in-right"></i>
          <span>Login</span>
        </RouterLink>
      </li>
      <!-- End Login Page Nav -->

      <li class="nav-item">
        <RouterLink :to="{ name: 'error-404' }" class="nav-link collapsed" active-class="active">
          <i class="bi bi-dash-circle"></i>
          <span>Error 404</span>
        </RouterLink>
      </li>
      <!-- End Error 404 Page Nav -->
    </ul>
  </aside>
</template>

<style scoped>
.active {
  color: #4154f1!important;
}
</style>
