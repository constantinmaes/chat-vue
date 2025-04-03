<template>
    <div class="align-center d-flex h-screen justify-center">
        <v-card class="w-33">
            <v-card-text>
                <v-form v-model="valid" @submit.prevent="login">
                    <v-text-field v-model="email" :rules="emailRules" label="Email" required></v-text-field>
                    <v-text-field v-model="password" :rules="passwordRules" label="Password" required
                        type="password"></v-text-field>
                    <v-btn block color="primary" :disabled="!valid" type="submit">
                        Login
                    </v-btn>
                    <v-divider class="my-8"></v-divider>
                    <div>
                        <v-btn block to="/register" variant="outlined">Register</v-btn>
                    </div>
                </v-form>
            </v-card-text>
        </v-card>
    </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const email = ref('');
const password = ref('');
const valid = ref();

const emailRules = [
    (value: string) => !!value || 'Email is required',
    (value: string) => /.+@.+\.[a-z]{2,}/.test(value) || 'Email must be valid',
];

const passwordRules = [
    (value: string) => !!value || 'Password is required',
];

const login = async () => {
    const body = {
        email: email.value,
        password: password.value,
    };
    // import.meta.env.VITE_API_URL
    const { data } = await axios.post(import.meta.env.VITE_API_URL + '/auth/login', body);

    if (data.access_token) {
        localStorage.setItem('accessToken', data.access_token);
        router.push({ name: 'home' });
    }
}
</script>