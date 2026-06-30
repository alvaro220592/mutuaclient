<template>


    <q-page class="flex flex-center q-pa-md">
        <div class="box">
            <q-card flat class="q-my-md">
                <q-card-section class="column q-gutter-md">
                    <h1 class="text-h5 q-mb-lg">
                        Boas-vindas!
                    </h1>

                    <span>
                        Mútua é uma plataforma criada para aproximar pessoas e fortalecer redes de apoio dentro da
                        comunidade.
                    </span>

                    <span>
                        A proposta inicial é servir como uma ponte entre quem precisa de ajuda e quem deseja ajudar,
                        permitindo
                        que pedidos e oportunidades de apoio sejam encontrados de forma simples, próxima e acessível.
                    </span>
                    <span>
                        Com o tempo, a plataforma será expandida para incluir novos módulos sociais, como divulgação de
                        animais
                        desaparecidos, localização de pessoas desaparecidas e outras iniciativas voltadas ao cuidado
                        coletivo.
                    </span>

                    <span>
                        A ideia central é transformar proximidade em colaboração e tornar o apoio mútuo mais fácil de
                        acontecer.
                    </span>

                    <q-space />

                    <q-btn flat no-caps color="primary" label="Entrar" :to="{ name: 'login' }" />

                    <q-btn flat no-caps color="primary" label="Criar conta" :to="{ name: 'cadastrar' }" />
                </q-card-section>
            </q-card>
        </div>
    </q-page>
</template>

<style></style>