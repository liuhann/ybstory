<style lang="less">

    .message {
        position: absolute;
        bottom: 15vh;
        width: 100%;
        left: 0;
        text-align: center;
        .content {
            background: rgba(0,0,0,.4);
            color: #fff;
            border-radius: 5px;
            display: inline-block;
            padding: 10px;
        }
    }

    .loadingComponent {
        .loader {
            left: 50%;
            top: 50%;
            position: fixed;
            -webkit-transform: translate(-50%, -50%);
            transform: translate(-50%, -50%);
            #spinner {
                box-sizing: border-box;
                stroke: #673AB7;
                stroke-width: 3px;
                -webkit-transform-origin: 50%;
                transform-origin: 50%;
                -webkit-animation: line 1.6s cubic-bezier(0.4, 0, 0.2, 1) infinite, rotate 1.6s linear infinite;
                animation: line 1.6s cubic-bezier(0.4, 0, 0.2, 1) infinite, rotate 1.6s linear infinite;
            }
        }
    }

    @-webkit-keyframes rotate {
        from {
            -webkit-transform: rotate(0);
            transform: rotate(0); }
        to {
            -webkit-transform: rotate(450deg);
            transform: rotate(450deg); } }

    @keyframes rotate {
        from {
            -webkit-transform: rotate(0);
            transform: rotate(0); }
        to {
            -webkit-transform: rotate(450deg);
            transform: rotate(450deg); } }

    @-webkit-keyframes line {
        0% {
            stroke-dasharray: 2, 85.964;
            -webkit-transform: rotate(0);
            transform: rotate(0); }
        50% {
            stroke-dasharray: 65.973, 21.9911;
            stroke-dashoffset: 0; }
        100% {
            stroke-dasharray: 2, 85.964;
            stroke-dashoffset: -65.973;
            -webkit-transform: rotate(90deg);
            transform: rotate(90deg); } }

    @keyframes line {
        0% {
            stroke-dasharray: 2, 85.964;
            -webkit-transform: rotate(0);
            transform: rotate(0); }
        50% {
            stroke-dasharray: 65.973, 21.9911;
            stroke-dashoffset: 0; }
        100% {
            stroke-dasharray: 2, 85.964;
            stroke-dashoffset: -65.973;
            -webkit-transform: rotate(90deg);
            transform: rotate(90deg); } }
</style>

<template>
    <div class="loadingComponent" v-if="message || loading">
        <div class="message" v-if="message">
            <div class="content">
                {{message}}
            </div>
        </div>
        <div class="loader" v-if="loading">
            <svg viewBox="0 0 32 32" width="32" height="32">
                <circle id="spinner" cx="16" cy="16" r="14" fill="none"></circle>
            </svg>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            loading: {
                type: Boolean
            },
            message: {
                type: String,
            }
        },
        data: function() {
            return {

            };
        },
        components: {

        },

        created: function () {

        },

        mounted: function() {

        },

        methods: {

        },
    }
</script>