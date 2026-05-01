<template>
  <div class="language-switcher">
    <NuxtLink
      v-for="availableLocale in availableLocales"
      :key="availableLocale.code"
      :class="['btn', { active: availableLocale.code === locale }]"
      :to="switchLocalePath(availableLocale.code)"
      :aria-label="
        $t('components.language_switcher.label') + ' ' + availableLocale.name
      "
      :aria-current="availableLocale.code === locale ? 'true' : 'false'"
      @click="setLanguagePreference(availableLocale.code)">
      {{ availableLocale.code.toUpperCase() }}
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import type { LocaleCode } from '~/types/locales'

const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const availableLocales = computed(() =>
  (locales.value as Array<{ code: LocaleCode; name: string }>).map(l => ({
    code: l.code,
    name: l.name,
  }))
)

const setLanguagePreference = (code: LocaleCode) => {
  if (code === locale.value) {
    return
  }

  localStorage.setItem('preferredLanguage', code)
}

const updateDirAttribute = (newLocale: string) => {
  const currentLocale = locales.value.find(l => l.code === newLocale)
  document.documentElement.setAttribute('dir', currentLocale?.dir || 'ltr')
}

watch(locale, newLocale => {
  updateDirAttribute(newLocale)
})

onMounted(() => {
  const savedLanguage = localStorage.getItem('preferredLanguage') as LocaleCode

  if (
    savedLanguage &&
    locales.value.some(locale => locale.code === savedLanguage)
  ) {
    locale.value = savedLanguage
  }

  updateDirAttribute(locale.value)
})
</script>

<style lang="scss" scoped>
.language-switcher {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.2rem;
  border-radius: 20px;
  border: 1px solid $border-medium;
  background: rgba($white-color, 0.03);

  .btn {
    appearance: none;
    border: 0;
    background: transparent;
    color: rgba($text-color, 0.7);
    padding: 0.35rem 0.7rem;
    font-size: 0.8rem;
    font-weight: 600;
    font-family: inherit;
    letter-spacing: 0.05em;
    border-radius: 20px;
    cursor: pointer;
    transition:
      color 0.2s ease,
      background 0.2s ease;

    &:hover {
      color: $white-color;
    }

    &.active {
      background: linear-gradient(120deg, $aurora-1, $aurora-2);
      color: $white-color;
    }
  }
}
</style>
