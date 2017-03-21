<template>
    <div class="b-history">
        <div class="mdl-card mdl-shadow--2dp">
            <div class="mdl-card__title">
                <h2 class="mdl-card__title-text">Historique</h2>
            </div>
            <div class="mdl-card__supporting-text b--fullwidth">
                <div class="b--fullwidth b--center b-history__pages" v-if="nbPages > 1">
                    <a href="#" @click.prevent="previous()" :class="{ visible: isPrevious }">Précedent</a>
                    <span>Page {{ page }}/{{ nbPages }}</span>
                    <a href="#" @click.prevent="next()" :class="{ visible: isNext }">Suivant</a>
                </div>
                <table class="mdl-data-table mdl-js-data-table mdl-shadow--1dp b--fullwidth">
                    <thead>
                        <tr>
                            <th class="mdl-data-table__cell--non-numeric">Date</th>
                            <th class="mdl-data-table__cell--non-numeric">Type</th>
                            <th class="mdl-data-table__cell--non-numeric">Location</th>
                            <th class="mdl-data-table__cell--non-numeric">Objet</th>
                            <th class="mdl-data-table__cell--non-numeric">Avec</th>
                            <th>Valeur</th>
                        </tr>
                    </thead>
                    <tbody id="historyTable">
                        <tr v-for="item in paginatedHistory">
                            <td class="mdl-data-table__cell--non-numeric">{{ item.date | date }}</td>
                            <td class="mdl-data-table__cell--non-numeric">{{ translation(item.type) }}</td>
                            <td class="mdl-data-table__cell--non-numeric">{{ item.point }}</td>
                            <td class="mdl-data-table__cell--non-numeric" v-if="item.type == 'transfer'">{{ item.point }}</td>
                            <td class="mdl-data-table__cell--non-numeric" v-if="item.type == 'reload'">{{ item.mop }}</td>
                            <td class="mdl-data-table__cell--non-numeric" v-if="item.type == 'purchase'">{{ item.articles[0] }}</td>
                            <td class="mdl-data-table__cell--non-numeric" v-if="item.type == 'promotion'">
                                {{ item.promotion }}
                                <ul v-if="item.articles.length > 1" class="b-history__promotion">
                                    <li v-for="article in item.articles">{{ article }}</li>
                                </ul>
                            </td>
                            <td class="mdl-data-table__cell--non-numeric b--capitalized">Opérateur {{ item.seller.firstname }} {{ item.seller.lastname }}</td>
                            <td>{{ item.amount | price(true) }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import { get } from '../lib/fetch';
import date    from '../lib/date';
import price   from '../lib/price';

export default {
    data () {
        return {
            history  : [],
            page     : 1,
            nbPerPage: 5
        };
    },

    methods: {
        translation(type) {
            const translateTable = {
                'promotion': 'Achat',
                'purchase' : 'Achat',
                'reload'   : 'Rechargement',
                'transfer' : 'Virement'
            };

            return translateTable[type];
        },
        previous() {
            if (this.isPrevious) {
                this.page -= 1;
            }
        },
        next() {
            if (this.isNext) {
                this.page += 1;
            }
        }
    },

    mounted() {
        get(`history`)
            .then(result => {
                this.history = result;
            });
    },

    computed: {
        paginatedHistory() {
            return this.history.slice(this.start, this.start + parseInt(this.nbPerPage));
        },
        nbPages() {
            return Math.ceil(this.history.length / this.nbPerPage);
        },
        start() {
            return (this.page - 1) * this.nbPerPage;
        },
        isPrevious() {
            if (this.page - 1 > 0) {
                return true;
            }
            return false;
        },
        isNext() {
            if (this.page + 1 <= this.nbPages) {
                return true;
            }
            return false;
        }
    }
}
</script>

<style lang="sass">
    @import '../main.scss';

    .b-history__pages {
        display: flex;
        margin-bottom: 5px;

        > a {
            flex: 0;
            opacity: 0;
            pointer-events: none;
            text-decoration: none;

            &.visible {
                opacity: 1;
                pointer-events: all;
            }
        }

        > span {
            flex: 1;
        }
    }

    .b-history__promotion {
        margin-top: 2px;
        margin-bottom: 0px;
        padding-left: 25px;
        font-size: 12px;

        > li {
            line-height: 1.2;
        }
    }
</style>
