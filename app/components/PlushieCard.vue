<template>
  <article
    ref="el"
    :class="['plushie-card', 'fade-in-up', { 'is-visible': visible }]">
    <div class="frame">
      <img
        :src="currentSrc"
        :alt="$t('pictures.plushies.' + plushie.i18nKey + '.alt')"
        :title="$t('pictures.plushies.' + plushie.i18nKey + '.title')"
        loading="lazy"
        decoding="async"
        width="600"
        height="600" />
      <div class="glow" />
    </div>

    <div class="meta">
      <div class="meta-top">
        <h3>{{ $t('pictures.plushies.' + plushie.i18nKey + '.title') }}</h3>
        <p class="description">
          {{ $t('pictures.plushies.' + plushie.i18nKey + '.description') }}
        </p>
      </div>

      <div class="meta-bottom">
        <p v-if="plushie.dimensions" class="dimensions">
          <UIcon name="i-lucide-ruler" class="dim-icon" />
          {{ $t('pages.plushies.dimensions') }} : {{ plushie.dimensions }}
        </p>

        <div v-if="viewKeys.length > 1" class="views" role="tablist">
          <button
            v-for="v in viewKeys"
            :key="v"
            :class="['view-btn', { active: current === v }]"
            role="tab"
            :aria-selected="current === v"
            @click="current = v">
            {{ $t('pages.plushies.' + v) }}
          </button>
        </div>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { Plushie, PlushieView } from '~/types/content'

const props = defineProps<{ plushie: Plushie }>()

const viewKeys = computed(
  () => Object.keys(props.plushie.views) as PlushieView[]
)
const current = ref<PlushieView>(viewKeys.value[0] ?? 'front')
const currentSrc = computed(() => props.plushie.views[current.value] ?? '')

const { el, visible } = useReveal()
</script>

<style lang="scss" scoped>
.plushie-card {
  position: relative;
  display: flex;
  flex-direction: column;
  background: linear-gradient(
    160deg,
    rgba($white-color, 0.04),
    rgba($white-color, 0.01)
  );
  border: 1px solid $border-light;
  border-radius: 1.25rem;
  overflow: hidden;
  transition:
    transform 0.4s ease,
    border-color 0.4s ease,
    box-shadow 0.4s ease;

  &:hover {
    transform: translateY(-6px);
    border-color: $box-shadow-aurora;
    box-shadow: 0 18px 40px -20px $box-shadow-aurora-strong;
  }

  .frame {
    position: relative;
    aspect-ratio: 1 / 1;
    overflow: hidden;
    background: radial-gradient(
      circle at center,
      rgba($aurora-1, 0.14),
      transparent 70%
    );

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      transition:
        transform 0.6s ease,
        opacity 0.3s ease;
      padding: 1rem;
    }

    &:hover img {
      transform: scale(1.04);
    }

    .glow {
      position: absolute;
      inset: 0;
      pointer-events: none;
      background: radial-gradient(
        circle at 30% 20%,
        rgba($aurora-2, 0.18),
        transparent 60%
      );
      mix-blend-mode: screen;
    }
  }

  .meta {
    padding: 1rem 1.25rem 1.25rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.6rem;
    flex: 1;
    justify-content: space-between;

    .meta-top {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.6rem;

      h3 {
        font-size: 1.25rem;
        margin: 0;
        color: $white-color;
        text-align: center;
      }

      .description {
        font-size: 0.88rem;
        color: $text-muted;
        text-align: center;
        line-height: 1.5;
        margin: 0;
      }
    }

    .meta-bottom {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;
      margin-top: 0.5rem;

      .dimensions {
        display: inline-flex;
        align-items: center;
        gap: 0.35rem;
        font-size: 0.8rem;
        color: $text-faint;
        margin: 0;
        justify-content: center;

        .dim-icon {
          font-size: 0.9rem;
          color: $aurora-3;
        }
      }

      .views {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 0.35rem;
        margin-top: 0;

        .view-btn {
          appearance: none;
          border: 1px solid $border-medium;
          background: rgba($white-color, 0.03);
          color: rgba($text-color, 0.8);
          font-size: 0.78rem;
          font-weight: 600;
          letter-spacing: 0.02em;
          padding: 0.35rem 0.7rem;
          border-radius: 999px;
          cursor: pointer;
          transition: all 0.2s ease;

          &:hover {
            color: $white-color;
            border-color: rgba($aurora-1, 0.4);
          }

          &.active {
            background: linear-gradient(120deg, $aurora-1, $aurora-2);
            background-clip: padding-box;
            color: $white-color;
            border-color: transparent;
          }
        }
      }
    }
  }
}
</style>
