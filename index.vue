<template>
    <div class="stockWrap">
        <div class="tab_tit">
            <span
                v-for="c in props.column"
                :key="c.field"
                @click="c.sortable && doSort(c.field)"
                :class="{
                    desc: props.sortable.order === c.field && props.sortable.sort === 'desc',
                    asc: props.sortable.order === c.field && props.sortable.sort === 'asc',
                }"
                >{{ c.label }}</span
            >
        </div>
        <ul class="tab_list">
            <li v-for="r in props.row" :key="r.code" @click="rowHandle(r)">
                <template v-for="col in props.column">
                    <div 
                        class="stockName"
                        v-if="col.display"
                        v-html="col.display(r)"
                        :key="col.field"
                    ></div>

                    <span v-else class="red" :key="col.field">{{
                        r[col.field]
                    }}</span>
                </template>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { defineEmit, defineProps } from "vue";

const props = defineProps({
    column: Array,
    row: Array,
    sortable: Object
});

const emit = defineEmit(["sort",'rowHandle']);

const doSort = (order) => {
    let sort = 'asc';
    if(props.sortable.order === order && props.sortable.sort === 'asc'){
        sort = 'desc'
    }
    emit("sort", {order, sort});
};
const rowHandle = (row) => {
    emit('rowHandle', row)
}
</script>

<style lang="scss">
.stockWrap {
    padding: 0.15rem;
    font-size: 0.16rem;
    color: #000;
    h3 {
        font-size: 0.18rem;
        position: relative;
        padding-left: 0.3rem;
        line-height: 0.24rem;
        &::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 0.24rem;
            height: 0.24rem;
        }
    }
}

.tab_tit {
    color: #666;
    font-size: 0.13rem;
    display: flex;
    padding: 0.08rem 0;
    span {
        flex: 1;
        position: relative;
        text-align: right;
        &:first-of-type {
            text-align: left;
        }
    }
    .asc:after{
        content:'';
        display:inline-block;
        width:0.1rem;
        height: 0.1rem;
        background: url(./icon/direction-up.svg);
        background-size: cover;
    }
    .desc:after{
        content:'';
        display:inline-block;
        width:0.1rem;
        height: 0.1rem;
        background: url(./icon/direction-up.svg);
        background-size: cover;
        transform: rotate(180deg);
        transition: 0.2s;
    }
    b {
        transition: 0.15s;
    }
    .up {
        display: inline-block;
        width: 0.11rem;
        height: 0.11rem;
        background: url(../../assets/img/updown.png) no-repeat;
        background-size: 100% 100%;
        margin-left: 0.02rem;
        transform: rotate(180deg);
    }
    .down {
        display: inline-block;
        width: 0.11rem;
        height: 0.11rem;
        background: url(../../assets/img/updown.png) no-repeat;
        background-size: 100% 100%;
        margin-left: 0.02rem;
    }
}
.tab_list {
    li {
        display: flex;
        padding: 0.08rem 0;
        span {
            display: flex;
            flex: 1;
            align-items: center;
            justify-content: flex-end;
        }
        .red {
            color: #fd302f;
        }
        .green {
            color: #47ba74;
        }
        .stockName {
            flex: 1;
            text-align: left;
            p {
                font-size: 0.15rem;
                color: #262626;
            }
            b {
                font-weight: normal;
                font-size: 0.12rem;
                color: #999;
            }
        }
    }
    .qing {
        color: #999;
        span,
        .red,
        .green {
            color: #999;
        }
        .stockName {
            p,
            b {
                color: #999;
            }
        }
    }
}
</style>