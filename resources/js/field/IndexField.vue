<template>
    <div>
        <template v-if="display == 'normal'">
            <span >{{ field.value }}</span>
        </template>
        <template v-else>
            <template v-if="field.image">
                <img v-if="field.type == 'image'" :src="field.image" style="object-fit: cover;" class="w-8 h-8" :class="{ 'rounded-full': field.rounded, rounded: !field.rounded }" />
                <div v-else v-html="field.image" class="svg-icon">

                </div>
            </template>
            <template v-else>
                <span class="pl-2">&mdash;</span>
            </template>
            <modal-filemanager
                    ref="filemanager"
                    :resource="resourceName"
                    :name="field.attribute"
                    :home="field.home"
                    :active="openModal"
                    :currentPath="currentPath"
                    :defaultFolder="defaultFolder"
                    :filter="field.filterBy"
                    :buttons="field.buttons"
                    v-on:open-modal="openModalCreateFolder"
                    v-on:close-modal="closeFilemanagerModal"
                    v-on:update-current-path="updateCurrentPath"
                    v-on:showInfoItem="showInfoItem"
                    v-on:uploadFiles="uploadFiles"
                    :value="value">

            </modal-filemanager>

            <DetailPopup
                    ref="detailPopup"
                    :info="info"
                    :active="activeInfo"
                    :popup="true"
                    :buttons="field.buttons"
                    v-on:closePreview="closePreview"
                    v-on:refresh="refreshCurrent"
                    v-on:selectFile="setValue"
                    v-on:rename="fileRenamed"
            >
            </DetailPopup>


            <!--
                        <create-folder ref="createFolderModal" :active="showCreateFolder" :current="currentPath" v-on:closeCreateFolderModal="closeModalCreateFolder" v-on:refresh="refreshCurrent" />

                        <UploadProgress ref="uploader" :current="currentPath" :visibility="field.visibility" :rules="field.upload_rules" v-on:removeFile="removeFileFromUpload"></UploadProgress>
            -->

            <file-select :cnt="field.cnt" :id="field.name" :field="field" :css="errorClasses"  v-model="value" v-on:open-modal="openFilemanagerModal"></file-select>

            <!--            <p class="mt-3 flex items-center text-sm" v-if="value">
                            <button type="button" class="cursor-pointer dim btn btn-link text-primary inline-flex items-center" @click="openRemoveModal">
                                <icon type="delete" view-box="0 0 20 20" width="16" height="16" />
                                <span class="class ml-2 mt-1">
                                    {{__('Delete')}}
                                </span>
                            </button>
                        </p>-->

            <!--            <confirm-modal-remove-file
                                :active="removeModalOpen"
                                @confirm="removeFile"
                                @close="closeRemoveModal"></confirm-modal-remove-file>-->
            <!--
                        <p v-if="hasError" class="my-2 text-danger">
                            {{ firstError }}
                        </p>-->

        </template>
    </div>

</template>

<script>
export default {
    props: ['resourceName', 'field'],
    data: () => ({
        display: 'normal',
    }),
    mounted() {
        this.display = this.field.display || 'normal';
    },
};
</script>

<style>
.svg-icon > svg {
    width: 2rem;
    height: 2rem;
    fill: var(--80);
}
</style>
