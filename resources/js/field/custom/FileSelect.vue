<template>
    <div class="w-3/4 py-4 break-words"><span class=" cursor-pointer whitespace-no-wrap px-2 py-1 rounded-full uppercase text-xs font-bold mt-1 bg-info-light text-info-dark" @click="openModalFilemanager">
{{ field.cnt }}</span></div>

<!--        <input type="text" class="flex-shrink flex-grow flex-auto leading-normal w-px flex-1 form-control form-input form-input-bordered-l relative"
               :placeholder="__('Select a file')" v-model="value">-->
<!--        <div>

            <span class="cursor-pointer whitespace-no-wrap px-2 py-1 rounded-full uppercase text-xs font-bold mt-1 bg-info-light text-info-dark" @click="openModalFilemanager">{{ field.cnt }}</span>

    </div>-->
</template>

<script>
export default {
    props: ['value', 'field','cnt'],

    methods: {
        openModalFilemanager() {
            this.$emit('open-modal');
        },
    },
};
</script>

<style scoped>
/*.form-input-bordered-l {
    background-color: var(--white);
    border-width: 1px;
    border-color: var(--60);
    padding-left: 0.75rem;
    padding-right: 0.75rem;
    color: var(--80);
    border-radius: 0.5rem;
    -webkit-box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.05);
    border-bottom-right-radius: initial;
    border-top-right-radius: initial;
}*/

.filemanager-open {
    border-color: var(--60);
}
</style>
