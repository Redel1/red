const { createApp } = Vue




createApp({
  data() {
    return {
      email: '',
      password: '',
      loading: false,
      error: '',
    }
  },
  methods: {
    register() {
      this.loading = true
      fetch('http://studentsystem.xyz:8080/user', {
        method: "POST",
        body: JSON.stringify({
          email: this.email,
          password: this.password
        })
      }).then((response) => {
        switch (response.status) {
          case 201:
            alert("Успешная регистрация")
          case 403:
            this.error = ('Такой пользователь уже существует')
            break;
          case 400:
            this.error = ('Не верные данные')
            break;
        }
        return response.json();
      }).then((data) => {
        this.loading = false
        // location.href='/'
      }).catch((err) => {
        console.error("Невозможно отправить запрос", err);
      });
    }
  },
  login() {
    this.loading = true
    fetch('http://studentsystem.xyz:8080/user/auth', {
      method: "POST",
      body: JSON.stringify({
        email: this.email,
        password: this.password,

      })
    }).then((response) => {
      switch (response.status) {
        case 200:
          alert('Вы авторизовались ')
        case 403:
          this.error = ('Не верный логин или пароль')
          break;
        case 400:
          this.error = ('Не верные данные')
          break;
      }
      return response.json();
    }).then((data) => {
      this.loading = false
      if (data['access_token']) {
        alert('Вы успешно вошли')
      }
      console.log(data)
    }).catch((err) => {
      console.error("Невозможно отправить запрос", err);
    });
  }
}).mount('#app')
