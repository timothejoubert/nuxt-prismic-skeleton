<script lang="ts" setup="">
const mediaProps = {
    reference: {
        embed_url: 'https://vimeo.com/786243875',
        type: 'video',
        version: '1.0',
        title: 'AYA - full',
        author_name: 'Ateliers BK',
        author_url: 'https://vimeo.com/ateliersbk',
        provider_name: 'Vimeo',
        provider_url: 'https://vimeo.com/',
        thumbnail_url:
      'https://i.vimeocdn.com/video/1610340079-713439f29d53aab3162c439c048c3e704a5191e72f803f6f8af04e6b8f56454e-d_295x166',
        thumbnail_width: 295,
        thumbnail_height: 166,
        html: '<iframe src="https://player.vimeo.com/video/786243875?app_id=122963" width="426" height="240" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write" title="AYA - full"></iframe>',
        is_plus: '0',
        account_type: 'standard',
        width: 426,
        height: 240,
        duration: 63,
        description:
      'Studio BK a réalisé les contenus visuels de l’expérience immersive AYA dans le centre commercial WAFI à Dubaï. Douze expériences immersives et interactives pour partir à la découverte d’un univers unique. AYA est un sanctuaire, caché de l’autre côté des étoiles, construit pour communier avec la beauté naturelle d’un cosmos mystérieux.\n\nhttps://ateliers-bk.com/portfolio/aya/',
        thumbnail_url_with_play_button:
      'https://i.vimeocdn.com/filter/overlay?src0=https%3A%2F%2Fi.vimeocdn.com%2Fvideo%2F1610340079-713439f29d53aab3162c439c048c3e704a5191e72f803f6f8af04e6b8f56454e-d_295x166&src1=http%3A%2F%2Ff.vimeocdn.com%2Fp%2Fimages%2Fcrawler_play.png',
        upload_date: '2023-01-04 07:14:05',
        video_id: 786243875,
        uri: '/videos/786243875',
    },
    video: {
        background: true,
    },
    image: {
        reference: {
            dimensions: {
                width: 960,
                height: 540,
            },
            alt: 'Thumbnail principale du teaser pour l\'exposition immersive aya universe',
            copyright: null,
            url: 'https://images.prismic.io/hugo-tomasi-v2/Zh1cezjCgu4jz1Ly_aya-universe-04.png?auto=format,compress',
            id: 'Zh1cezjCgu4jz1Ly',
            edit: {
                x: 0,
                y: 0,
                zoom: 1,
                background: 'transparent',
            },
        },
        width: '812',
        height: '475',
        tag: 'img',
        sizes: 'xs:100vw sm:100md md:100vw lg:75vw xl:75vw xxl:75vw hd:75vw qhd:75vw',
    },
}
</script>

<template>
    <NuxtStoryVariant>
        <VPrismicMedia v-bind="mediaProps" />
    </NuxtStoryVariant>
</template>

<style lang="scss" module>
.root {
}
</style>
