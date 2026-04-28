<template>
  <div class="lang">
    <button
      v-for="loc in availableLocales"
      :key="loc.code"
      :class="['btn', { active: loc.code === locale }]"
      :aria-label="$t('components.language_switcher.label') + ' ' + loc.name"
      :aria-current="loc.code === locale ? 'true' : 'false'"
      @click="switchTo(loc.code)">
      {{ loc.code.toUpperCase() }}
    </button>
  </div>
</template>

<script setup lang="ts">
const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()
const router = useRouter()

const availableLocales = computed(() =>
  (locales.value as Array<{ code: string; name: string }>).map(l => ({
    code: l.code,
    name: l.name,
  }))
)

const switchTo = (code: string) => {
  const path = switchLocalePath(code)
  if (path) router.push(path)
}
</script>

<style lang="scss" scoped>
.lang {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.2rem;
  border-radius: 999px;
  border: 1px solid $border-medium;
  background: rgba($white-color, 0.03);
}

.btn {
  appearance: none;
  border: 0;
  background: transparent;
  color: rgba($text-color, 0.7);
  padding: 0.35rem 0.7rem;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  border-radius: 999px;
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
    box-shadow: 0 4px 18px $box-shadow-aurora-light;
  }
}
</style>
