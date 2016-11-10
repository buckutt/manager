<template>
    <div class="sidebar mdl-layout__drawer">
        <h1>Buckless</h1>
        <nav class="mdl-navigation">
            <router-link to="/" class="mdl-button mdl-button--accent mdl-js-button mdl-js-ripple-effect">
                <i class="material-icons">home</i>
                Accueil
            </router-link>
        </nav>
    </div>
</template>

<style lang="sass">
    @import '../main.scss';

    .sidebar {
        background: #34495e;
        color: #fff;
        width: 200px;

        > h1 {
            font-size: 2.5rem;
            font-weight: 300;
            margin: 1rem 0;
            text-align: center;
        }

        > nav {
            > a {
                box-sizing: border-box;
                color: #fff !important;
                padding-left: 10px;
                text-align: left;

                > i {
                    margin-right: 10px;
                }
            }
        }
    }
</style>
