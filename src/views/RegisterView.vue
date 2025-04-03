<template>
    <div class="align-center d-flex h-screen justify-center">
        <v-card class="w-33">
            <v-card-text>
                <v-form v-model="valid" @submit.prevent="register">
                    <v-text-field v-model="email" :rules="emailRules" label="Email" required></v-text-field>
                    <v-text-field v-model="firstName" :rules="requiredRules" label="First name" required></v-text-field>
                    <v-text-field v-model="lastName" :rules="requiredRules" label="Last name" required></v-text-field>
                    <v-text-field v-model="password" :rules="requiredRules" label="Password" required
                        type="password"></v-text-field>
                    <v-btn block color="primary" :disabled="!valid" type="submit">
                        Register
                    </v-btn>
                    <v-divider class="my-8"></v-divider>
                    <div>
                        <v-btn block to="/login" variant="outlined">Login</v-btn>
                    </div>
                </v-form>
            </v-card-text>
        </v-card>
        <v-snackbar v-model="showSnackbar">{{ snackbarMessage }}</v-snackbar>
    </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const email = ref('');
const firstName = ref('');
const lastName = ref('');
const password = ref('');
const showSnackbar = ref<boolean>(false);
const snackbarMessage = ref('');
const valid = ref();

const emailRules = [
    (value: string) => !!value || 'Email is required',
    (value: string) => /.+@.+\.[a-z]{2,}/.test(value) || 'Email must be valid',
];

const requiredRules = [
    (value: string) => !!value || 'Password is required',
];

const register = async () => {

    try {
        const body = {
            email: email.value,
            firstName: firstName.value,
            lastName: lastName.value,
            password: password.value,
        };
        // import.meta.env.VITE_API_URL
        const { status } = await axios.post(import.meta.env.VITE_API_URL + '/auth/register', body);


        if (status === 201) {
            snackbarMessage.value = 'Registration successful.';
            showSnackbar.value = true;
            setTimeout(() => {
                router.push({ name: 'login' });
            }, 2000);

        } else {
            // Handle error
            console.error('Registration failed');
        }
    } catch (e) {
        console.error('Error during registration:', e);
        snackbarMessage.value = 'Registration failed. Please try again.';
        showSnackbar.value = true;
    }


}
</script>