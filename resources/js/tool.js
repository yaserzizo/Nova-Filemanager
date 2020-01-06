import VueTooltip from 'v-tooltip';
Nova.booting((Vue, router) => {

    router.addRoutes([
        {
            name: 'nova-filemanager',
            path: '/nova-filemanager',
            component: require('./components/Tool').default,
        },
    ]);



    Vue.use(VueTooltip);
    VueTooltip.options.defaultTemplate = '<div dir="rtl" class="tooltip-vue" role="tooltip"><div class="tooltip-vue-arrow"></div><div class="tooltip-vue-inner"></div></div>';
    VueTooltip.options.defaultArrowSelector = '.tooltip-vue-arrow, .tooltip-vue__arrow';
    VueTooltip.options.defaultInnerSelector = '.tooltip-vue-inner, .tooltip-vue__inner';
});
