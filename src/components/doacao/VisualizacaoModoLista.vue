<template>
    <q-infinite-scroll @load="onCarregarMais">
        <div class="column q-gutter-md">
            <DoacaoCard v-for="doacao in doacoes" :key="doacao.id" :areaAdmin="areaAdmin" :usuario="doacao.usuario.name"
                :doacao="doacao" @editar="$emit('editar', doacao)" @alternar-status="$emit('alternar-status', doacao)"
                @excluir="$emit('excluir', doacao)" />
        </div>
    </q-infinite-scroll>
</template>

<script setup>
import DoacaoCard from 'src/components/doacao/DoacaoCard.vue'

const props = defineProps({
    doacoes: {
        type: Array,
        required: true
    },
    funcaoCarregarMais: {
        type: Function,
        required: true
    },
    areaAdmin: {
        type: Boolean,
        default: false
    }
})

const onCarregarMais = async (_, done) => {
    await props.funcaoCarregarMais()
    done()
}

defineEmits([
    'editar',
    'alternar-status',
    'excluir'
])
</script>