<template>
    <div class="b-autocomplete b--inputwidth">
        <mdl-textfield :floating-label="label" v-model="content" @input="changeInput(content)" class="b--fullwidth"></mdl-textfield>
        <ul :for="id" class="b-completelist mdl-shadow--2dp" ref="menu" v-if="isOpen">
            <li v-for="suggestion in displayedSuggestions" @click="select(suggestion)" class="b-completelist__item">
                {{ suggestion.name }}
            </li>
        </ul>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import debounce                 from 'lodash.debounce';

export default {
    props: {
        id: {
            type    : String,
            required: true
        },
        label: {
            type    : String,
            required: true
        }
    },

    data() {
        return {
            content: '',
            open   : false
        };
    },

    computed: {
        ...mapState({
            users: state => state.app.users
        }),

        displayedSuggestions() {
            return this.users.map(user => ({
                name: `${user.firstname} ${user.lastname}`,
                id  : user.id
            }));
        },

        isOpen() {
            return (
                this.displayedSuggestions.length > 0 &&
                this.open === true
                && this.content.length > 0
            );
        }
    },

    methods: {
        ...mapActions([
            'searchUsers'
        ]),

        select(suggestion) {
            this.content = suggestion.name;
            this.open    = false;
            this.$emit('input', suggestion);
        },

        changeInput(content) {
            this.searchUsers(content);
            this.open = true;
            this.$emit('input', undefined);
        }
    },

    mounted() {
        const searchUsers = this.searchUsers;
        this.searchUsers  = debounce(name => searchUsers(name), 200);
    }
};
</script>

<style>
    .b-autocomplete {
        display: inline-block;
        margin: 0;
        max-width: 300px;
    }

    .b-completelist {
        width: 300px;
        background: white;
        position: absolute;
        z-index: 10;
        margin-top: -20px;
        margin-bottom: 0px;
        list-style: none;
        padding: 0;
        color: black;
    }

    .b-completelist__item {
        height: 40px;
        line-height: 40px;
        padding-left: 10px;
        cursor: pointer;
    }

    .b-completelist__item:hover {
        background: #EEEEEE;
        transition: all 0.1s ease-in-out;
    }
</style>
