<template>
  <div>
    <vue-word-cloud
        style="height: 480px;width: 640px;margin-top:15px;"
        :words="[['romance', 19], ['horror', 3],['horror', 11],['horror', 7],['horror', 3], ['fantasy', 9], ['adventure', 3]]"
        :color="([, weight]) => weight > 12 ? 'DeepPink' : weight > 8 ? 'Skyblue' : weight > 5 ? 'RoyalBlue' : 'Indigo'"
        font-family="Roboto"
        />
  </div>
</template>