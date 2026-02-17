<script setup lang="ts">
</script>

<template>
  <main id="main" class="main">

    <div class="pagetitle">
      <h1>
        <slot name="title"> </slot>
      </h1>
      <nav>
        <ol class="breadcrumb">
         <li class="breadcrumb-item">
            <RouterLink :to="{ name: 'home' }">
              Home
            </RouterLink>
          </li>
          <li class="breadcrumb-item active">
            <slot name="title"> </slot>
          </li>
        </ol>
      </nav>
    </div>

    <slot name="home"> </slot>
    <slot name="user"> </slot>
    <slot name="faq"> </slot>
    <slot name="contact"> </slot>

  </main>
</template>

<style scoped>
</style>