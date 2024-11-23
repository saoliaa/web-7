package main

// некоторые импорты нужны для проверки
import (
	"fmt"
	"net/http"
)

func handler(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("Hello, web!"))
}

func main() {
	http.HandleFunc("/api/get", corsMiddleware(handler))

	// Запускаем веб-сервер на порту 8081
	err := http.ListenAndServe(":8081", nil)
	if err != nil {
		fmt.Println("Ошибка запуска сервера:", err)
	}
}

func corsMiddleware(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

		if r.Method == http.MethodOptions {
			return
		}

		next(w, r)
	}
}
