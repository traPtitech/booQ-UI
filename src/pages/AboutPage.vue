<template>
  <div :class="$style.container">
    <h1 id="booQとは">booQとは</h1>
    <ul>
      <li>traPの備品管理ツール</li>
      <li>部員間の書籍貸し借り補助ツール</li>
      <li>書籍の知見共有ツール</li>
    </ul>
    <h2>各機能の詳細</h2>
    <h3 id="備品の管理について">備品の管理について</h3>
    <ul>
      <li>
        traP部員ができること
        <ul>
          <li>コメント、期限を入力して備品の貸し借りができます。</li>
          <li>備品にいいねみたいなものをつけられます。</li>
          <li>備品のログを見たり、現在の備品の状態がわかります。</li>
          <li>ダッシュボート等で貸し出し期限などcheckできます。</li>
        </ul>
      </li>
      <li>
        管理者ができること
        <ul>
          <li>備品の登録、変更ができます。</li>
          <ul>
            <li>
              備品の所持者は
              <code :class="$style.code">traP</code>、
              <code :class="$style.code">個人</code>（管理者のみ）
              から選択します。
            </li>
            <li>備品の名前、説明、画像を登録、変更できます。</li>
            <li>
              各備品について貸し出し可能か設定できます（個人の所有物について想定してます）。
            </li>
          </ul>
        </ul>
      </li>
    </ul>
    <h3 id="部員間の書籍貸し借りについて">部員間の書籍貸し借りについて</h3>
    <ul>
      <li>
        traP部員ができること
        <ul>
          <li>本の登録、変更ができます。（ISBNコードで管理します）</li>
          <li>本の名前、説明、画像を登録、変更できます。</li>
          <li>コメント、期限を入力して、本の貸し借りができます。</li>
          <li>本にいいねみたいなものをつけられます。</li>
          <li>本のログを見たり、現在の本の状態がわかります。</li>
          <li>ダッシュボート等で貸し出し期限などcheckできます。</li>
          <li>誰がなんて本を持っているかわかります。</li>
          <li>
            各本について貸し出し可能か設定できます。
            <ul>
              <li>「自分もこの本持ってるぜ」とアピールしましょう！</li>
            </ul>
          </li>
        </ul>
      </li>
      <li>
        管理者ができること
        <ul>
          <li>
            本の所持者登録で
            <code :class="$style.code">traP</code>を選べられます。
          </li>
        </ul>
      </li>
    </ul>
    <h3 id="書籍の知見共有ツールについて">書籍の知見共有ツールについて</h3>
    <ul>
      <li>本に紐づけて感想を書けます。</li>
      <li>自分がどんな本を読んできたのかを振り返るといったことができます。</li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import useTitle from './composables/useTitle'

useTitle(computed(() => 'booQについて'))
</script>

<style lang="scss" module>
.container {
  padding: 3rem;
  text-align: left;
  ul,
  li {
    list-style: initial;
    margin-left: 1em;
  }

  @media (max-width: 450px) {
    padding: 2rem;
  }
}
.code {
  display: inline-block;
  background-color: #fbe5e1;
  color: #c0341d;
  padding: 0.2em 0.4em;
  border-radius: 0.25em;
  font-weight: bold;
  font-family: monospace;
}
</style>
