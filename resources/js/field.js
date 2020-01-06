Nova.booting(Vue => {
    Vue.component('index-filemanager-field', require('./field/DetailsField').default);
    Vue.component('detail-filemanager-field', require('./field/DetailsField').default);
    Vue.component('form-filemanager-field', require('./field/FormField').default);
});
