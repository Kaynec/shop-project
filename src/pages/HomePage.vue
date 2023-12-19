<script setup>
const hideText = ref(true)

setTimeout(() => {
  hideText.value = false
}, 500)
</script>

<template>
  <div class="first-content">
    <ul class="first-text text-dark dark:text-white" :class="{ hidden: hideText }">
      <li>W</li>
      <li>E</li>
      <li>L</li>
      <li>C</li>
      <li>O</li>
      <li>M</li>
      <li>E</li>
    </ul>
  </div>
</template>

<route lang="yaml">
  layout: 3
  dontShowFooter: true
</route>

<style scoped>
.first-content {
  display: table;
  width: 100%;
  height: 100%;
}
.first-text {
  list-style: none;
  margin: 0;
  padding: 0;
  display: table-cell;
  vertical-align: middle;
  text-align: center;
}

.first-text li {
  display: inline-block;
  font-family: Open Sans, Arial;
  font-weight: 300;
  font-size: clamp(2.5rem , 2.9rem , 4rem);

  opacity: 1;
  transition: all 2.5s ease;
  margin-right: 25px15px;
  margin-left: 25px15px;

}

.first-text.hidden li {
  opacity: 0;
}

.first-text.hidden li:nth-child(1) { transform: translateX(-200px) translateY(-200px);}
.first-text.hidden li:nth-child(2) { transform: translateX(20px) translateY(100px);}
.first-text.hidden li:nth-child(3) { transform: translateX(-150px) translateY(-80px);}
.first-text.hidden li:nth-child(4) { transform: translateX(10px) translateY(-200px);}
.first-text.hidden li:nth-child(5) { transform: translateX(-300px) translateY(200px);}
.first-text.hidden li:nth-child(6) { transform: translateX(20px) translateY(-20px);}
.first-text.hidden li:nth-child(7) { transform: translateX(30px) translateY(200px);}
</style>
