<template>
    <div>
        <transition name="fade">
            <div class="b-table">
                <div class="b-table__paging" v-if="paging">
                    Afficher <select v-model="chosenPaging"><option v-for="option in pagingOptions">{{ option }}</option></select> entrées
                </div>
                <div class="b-responsive-table">
                    <table class="mdl-data-table mdl-js-data-table mdl-shadow--2dp b--fullwidth" v-if="displayedData.length > 0">
                        <thead>
                            <tr>
                                <th v-for="header in headers" class="mdl-data-table__cell--non-numeric">
                                    {{ header.title }}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(data, index) in displayedData">
                                <td v-for="(header, index2) in headers" class="mdl-data-table__cell--non-numeric" :class="header.class">
                                    <template v-if="data.warning && index2 === 0">
                                        <mdl-tooltip :target="data.id" v-html="data.warning" class="b--uncapitalize"></mdl-tooltip>
                                        <i :id="data.id" class="material-icons b-table__warning">warning</i>
                                    </template>
                                    <template v-if="header.type">
                                        <span v-if="header.type === 'price'">{{ lodget(data, header.field) | price(true) }}</span>
                                        <span v-if="header.type === 'date'">{{ lodget(data, header.field) | date }}</span>
                                        <span v-if="header.type === 'checkbox'">
                                            <mdl-checkbox :value="lodget(data, header.field)" disabled></mdl-checkbox>
                                        </span>
                                    </template>
                                    <span v-else>{{ lodget(data, header.field) }}</span>
                                    <ul v-if="header.list" class="b-table__list">
                                        <li v-for="article in lodget(data, header.list)">{{ article }}</li>
                                    </ul>
                                </td>
                            </tr>
                        </tbody>
                        <tfoot v-if="pagesNumber > 1">
                            <tr>
                                <td :colspan="columnsNumber">
                                    <div class="b--center b--fullwidth b-table__pages">
                                        <span>
                                            Affichage de {{ displayedData.length }} éléments sur {{ filteredData.length }}
                                        </span>
                                        <span>
                                            <a href="#" @click.prevent="previous()" :class="{ 'b-table__visible': isPrevious }">Précedent</a>
                                            Page {{ adjustedPage }}/{{ pagesNumber }}
                                            <a href="#" @click.prevent="next()" :class="{ 'b-table__visible': isNext }">Suivant</a>
                                        </span>
                                    </div>
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </transition>
        <transition name="fade">
            <p v-if="displayedData.length === 0">Aucune donnée à afficher.</p>
        </transition>
    </div>
</template>

<script>
import lodget    from 'lodash.get';
import fuzzy     from 'fuzzy';
import sortOrder from '../lib/sortOrder';
import '../lib/price';
import '../lib/date';

export default {
    props: {
        headers: Array,
        data   : Array,
        filter : {
            type    : Object,
            required: false
        },
        sort: {
            type    : Object,
            required: false
        },
        paging: {
            type    : Number,
            required: false
        }
    },

    data() {
        return {
            page         : 1,
            pagingOptions: [5, 10, 25, 50, 100],
            chosenPaging : this.paging
        };
    },

    methods: {
        previous() {
            if (this.isPrevious) {
                this.page = this.adjustedPage - 1;
            }
        },

        next() {
            if (this.isNext) {
                this.page += 1;
            }
        },

        lodget(object, path) {
            return lodget(object, path);
        },

        displayAction(action, object) {
            const condition = action.condition;
            if (condition) {
                switch (condition.statement) {
                    case 'isIn':
                        return (condition.value.indexOf(object[condition.field]) > -1);
                    case 'isNotIn':
                        return (condition.value.indexOf(object[condition.field]) === -1);
                    default:
                        break;
                }
            }
            return true;
        }
    },

    computed: {
        filteredData() {
            if (this.filter) {
                return fuzzy
                    .filter(this.filter.val, this.data, { extract: el => el[this.filter.field] })
                    .map(d => d.original);
            }

            return this.data.slice();
        },

        displayedData() {
            let transformedData = this.filteredData.slice();

            if (this.sort) {
                transformedData = transformedData
                    .sort((a, b) => sortOrder(a[this.sort.field], b[this.sort.field], this.sort.order));
            }

            if (this.paging) {
                transformedData = transformedData
                    .slice(this.start, this.start + parseInt(this.chosenPaging, 10));
            }

            return transformedData;
        },

        start() {
            if (!this.paging) {
                return 0;
            }

            return (this.adjustedPage - 1) * this.chosenPaging;
        },

        pagesNumber() {
            if (!this.paging) {
                return 1;
            }

            return Math.ceil(this.filteredData.length / this.chosenPaging);
        },

        isPrevious() {
            if (this.adjustedPage - 1 > 0) {
                return true;
            }
            return false;
        },

        isNext() {
            if (this.adjustedPage + 1 <= this.pagesNumber) {
                return true;
            }
            return false;
        },

        adjustedPage() {
            return Math.min(this.page, this.pagesNumber);
        },

        columnsNumber() {
            return (this.actions) ? this.headers.length + 1 : this.headers.length;
        }
    }
};
</script>

<style>
    .b-table__paging {
        width: 100%;
        text-align: right;
        font-size: 12px;
        margin-bottom: 5px;
    }

    .b-table__list {
        margin-top: 2px;
        margin-bottom: 0px;
        padding-left: 25px;
        font-size: 12px;

        & > li {
            line-height: 1.2;
        }
    }

    .b-table__warning {
        vertical-align: middle;
        font-size: 25px;
        margin-right: 10px
    }

    .b-table__pages {
        display: flex;
        justify-content: space-between;

        & > span {
            & > a {
                opacity: 0;
                pointer-events: none;
                text-decoration: none;
                margin: 10px;

                &.b-table__visible {
                    opacity: 1;
                    pointer-events: all;
                }
            }
        }
    }
</style>
