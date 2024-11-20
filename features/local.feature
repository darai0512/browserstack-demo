# language: ja
# https://docs.cucumber.io/cucumber/cucumber-expressions/
機能: dashboard
  シナリオ: ログインできる
    前提 "LP"画面において
    もし "ログイン"ボタンをクリックし
    かつ "ログイン"画面に遷移し
    かつ "email"入力欄に"firstuser@example.com"を入力し
    かつ "password"入力欄に"password123"を入力し
    かつ "ログイン"ボタンをクリックした
    ならば dashboardの"挨拶欄"に"firstuser@example.com"と表示された
