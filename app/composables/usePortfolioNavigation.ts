export type PortfolioTab = 'home' | 'about' | 'projects'

export const TAB_ORDER: PortfolioTab[] = ['home', 'about', 'projects']

export const usePortfolioNavigation = () => {
  const currentTab = useState<PortfolioTab>('portfolio_tab', () => 'home')

  const tabIndex = computed(() => TAB_ORDER.indexOf(currentTab.value))

  const goToTab = (tab: PortfolioTab) => {
    currentTab.value = tab
  }

  const nextTab = () => {
    const nextIdx = Math.min(tabIndex.value + 1, TAB_ORDER.length - 1)
    currentTab.value = TAB_ORDER[nextIdx]
  }

  const prevTab = () => {
    const prevIdx = Math.max(tabIndex.value - 1, 0)
    currentTab.value = TAB_ORDER[prevIdx]
  }

  return {
    currentTab,
    tabIndex,
    goToTab,
    nextTab,
    prevTab,
    tabs: TAB_ORDER,
  }
}
