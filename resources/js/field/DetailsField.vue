<template>
    <div v-else :class="{'block text-right': field.indexAlign == 'right'}">
        <a class="whitespace-no-wrap" :class="field.classes" v-html="field.text" @click="openModalFunc" />
        <template>
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
                >

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
            </template>

                <!--
                            <create-folder ref="createFolderModal" :active="showCreateFolder" :current="currentPath" v-on:closeCreateFolderModal="closeModalCreateFolder" v-on:refresh="refreshCurrent" />

                            <UploadProgress ref="uploader" :current="currentPath" :visibility="field.visibility" :rules="field.upload_rules" v-on:removeFile="removeFileFromUpload"></UploadProgress>
                -->

                <file-select :cnt="field.cnt" :id="field.name" :field="field"   v-on:open-modal="openFilemanagerModal"></file-select>


    </div>
</template>

<script>
   /* import { FormField, HandlesValidationErrors } from 'laravel-nova';*/
    import FileSelect from './custom/FileSelect';
    import ModalFileManager from '../components/ModalFileManager';
    import CreateFolderModal from '../components/CreateFolderModal';
    import DetailPopup from '../components/DetailPopup';
    import UploadProgress from '../components/UploadProgress';
    import ConfirmModalRemoveFile from '../components/ConfirmModalRemoveFile';
    import ImageDetail from '../modules/Image';

    import ConfirmModalDelete from '../components/ConfirmModalDelete';
    import RenameModal from '../components/RenameModal';

    import api from '../api';

    export default {
       /* mixins: [FormField, HandlesValidationErrors],*/

        props: ['resourceName', 'resourceId', 'field'],

        components: {
            'file-select': FileSelect,
            'modal-filemanager': ModalFileManager,
            'create-folder': CreateFolderModal,
            DetailPopup: DetailPopup,
            UploadProgress: UploadProgress,
            'confirm-modal-remove-file': ConfirmModalRemoveFile,
            ImageDetail: ImageDetail,
            'rename-modal': RenameModal,
            'confirm-modal-delete': ConfirmModalDelete,
        },

        data: () => ({
            openModal: false,
            showCreateFolder: false,
            defaultFolder: null,
            currentPath: '/',
            cont:0,
            //modalFile
            info: {},
            activeInfo: false,
            popupDetailsLoaded: false,

            //uploader
            filesToUpload: {},
            uploadType: null,
            folderUploadedName: null,

            removeModalOpen: false,
        }),

        methods: {
            openModalFunc() {
                //console.log(this.field.cnt);
                //console.log(this.field.cnt >0);
                this.openModal = true;
            },
            openModalCreateFolder() {
                this.showCreateFolder = true;
            },
            closeModalCreateFolder() {
                this.showCreateFolder = false;
            },

            refreshCurrent() {
                this.$refs.filemanager.getData(this.currentPath);
            },

            openFilemanagerModal() {

                this.setCurrentPath();
                this.openModal = this.field.cnt >0;
            },

            closeFilemanagerModal() {
                this.openModal = false;
            },

            updateCurrentPath(val) {
                this.currentPath = val;
            },

            showInfoItem(item) {
                this.activeInfo = true;
                this.info = item;
            },

            closePreview() {
                this.info = {};
                this.activeInfo = false;
                this.popupDetailsLoaded = false;
            },

            uploadFiles(files, type, firstFolderName) {
                this.filesToUpload = files;
                this.uploadType = type;
                this.folderUploadedName = firstFolderName;
                this.$refs.uploader.startUploadingFiles(files, type);
            },

            removeFileFromUpload(uploadedFileId) {
                let index = this.filesToUpload.map(item => item.id).indexOf(uploadedFileId);

                this.$delete(this.filesToUpload, index);
                if (this.filesToUpload.length === 0) {
                    if (this.uploadType == 'folders') {
                        this.callFolderEvent(this.folderUploadedName);
                    }

                    this.folderUploadedName = null;
                    this.uploadType = null;

                    this.refreshCurrent();
                }
            },

            setCurrentPath() {
                if (this.field.folder != null) {
                    this.defaultFolder = this.field.folder;
                    this.currentPath = this.field.folder;
                } else {
                    this.defaultFolder = '/prog';
                    this.currentPath = '/proj';

                }
            },

            removeFile() {
                this.field.value = null;
                this.value = '';
                this.removeModalOpen = false;
            },

            fileRenamed(item) {
                this.info = item;
            },

            openRemoveModal() {
                this.removeModalOpen = true;
            },

            closeRemoveModal() {
                this.removeModalOpen = false;
            },

            callFolderEvent(path) {
                api.eventFolderUploaded(this.currentPathFolder + '/' + path);
            },

            /*
             * Set the initial, internal value for the field.
             */
            setInitialValue() {
                this.value = this.field.value || '';
            },

            /**
             * Fill the given FormData object with the field's internal value.
             */
            fill(formData) {
                formData.append(this.field.attribute, this.value || '');
            },

            /**
             * Update the field's internal value.
             */
            setValue(file) {
                this.value = file.path;
                this.closeFilemanagerModal();
            },
        },

        created() {

            this.setCurrentPath();
        },
    };
</script>
<style>
    .inactiveLink {
        pointer-events: none;
        cursor: default;
    }
</style>
