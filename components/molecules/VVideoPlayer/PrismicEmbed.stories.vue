<script setup lang="ts">
const youtube = {
  embed_url: 'https://youtu.be/BnEgnrUCXPY?si=nc8oTf7azPnPB9vp',
  type: 'video',
  version: '1.0',
  title: 'The Yussef Dayes Experience - Live From Malibu',
  author_name: 'Yussef Dayes',
  author_url: 'https://www.youtube.com/@yussefdayes12',
  provider_name: 'YouTube',
  provider_url: 'https://www.youtube.com/',
  thumbnail_url: 'https://i.ytimg.com/vi/BnEgnrUCXPY/hqdefault.jpg',
  thumbnail_width: 480,
  thumbnail_height: 360,
  html: '<iframe width="200" height="113" src="https://www.youtube.com/embed/BnEgnrUCXPY?feature=oembed" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen title="The Yussef Dayes Experience - Live From Malibu"></iframe>',
  height: 113,
  width: 200,
}

const vimeo = {
  embed_url: 'https://vimeo.com/379011318',
  type: 'video',
  version: '1.0',
  title: 'Showreel | Timothé Joubert | 2019',
  author_name: 'Timothe Joubert',
  author_url: 'https://vimeo.com/timothe',
  provider_name: 'Vimeo',
  provider_url: 'https://vimeo.com/',
  thumbnail_url:
    'https://i.vimeocdn.com/video/838938393-44cfbc70189aa01f4ffbe67670b1843a7ae5bd7603030a9719ff1fbf236a13e0-d_295x166',
  thumbnail_width: 295,
  thumbnail_height: 166,
  html: '<iframe src="https://player.vimeo.com/video/379011318?app_id=122963" width="426" height="240" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write" title="Showreel | Timothé Joubert | 2019"></iframe>',
  is_plus: '0',
  account_type: 'basic',
  width: 426,
  height: 240,
  duration: 23,
  description: '',
  thumbnail_url_with_play_button:
    'https://i.vimeocdn.com/filter/overlay?src0=https%3A%2F%2Fi.vimeocdn.com%2Fvideo%2F838938393-44cfbc70189aa01f4ffbe67670b1843a7ae5bd7603030a9719ff1fbf236a13e0-d_295x166&src1=http%3A%2F%2Ff.vimeocdn.com%2Fp%2Fimages%2Fcrawler_play.png',
  upload_date: '2019-12-12 07:19:30',
  video_id: 379011318,
  uri: '/videos/379011318',
}
</script>

<template>
  <NuxtStory>
    <NuxtStoryVariant title="Youtube">
      <VVideoPlayer :reference="youtube" :class="$style.player" />
    </NuxtStoryVariant>
    <NuxtStoryVariant title="Vimeo">
      <VVideoPlayer :reference="vimeo" :class="$style.player" />
    </NuxtStoryVariant>
  </NuxtStory>
</template>

<style lang="scss" module>
.player {
  width: 100%;
}
</style>
