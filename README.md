# sky-code

skycode 는 블로그[(blog.skydown.co.kr)](https://blog.skydown.co.kr) 에서 사용하고 있는 Code Syntax Highlighter 입니다.

***

## 정보

* skycode v2.0.0
	* node v10.15.0
	* npm v6.8.0
	* webpack v4.28.4
	* babel v7.x
* browser support
	* ie9+
	* ms edge
	* chrome

***

## 사용방법

## 빌드

```js
// init install
$npm i

// webpack dev server
$npm run dev

// build
$npm run build
```

***

### 적용

*HTML*

* ```selectTag``` > ```pre``` > ```code``` > ```p``` 순의 ```html``` 이 구성이 필요합니다.

```html
<div class="code-box">
	<pre data-language="js">
		<code>
			<p>function(){</p>
			<p style="padding-left:20px;">let arry = [1,2,3,4,5];</p>
			<p style="padding-left:20px;">arrt.forEach((item, index, arr) => {</p>
			<p style="padding-left:40px;">console.log(item)</p>
			<p style="padding-left:20px;">})</p>
			<p>}</p>
		</code>
	</pre>
</div>

<script src="skycode.js"><script>
```

*JS*

```js
var syntxHighlighter = new skyCode(".code-box", {
	classPrefix : "skycode"
});
```

***

### 설정

```html``` *language*

* ```pre``` 태그의 ```data-language``` 속성으로 언어를 설정 할 수 있습니다.
* ```html```, ```css```, ```js``` 설정이 가능합니다. (v1.0)
* 설정하지 않을 경우 ```js``` 로 기본 설정 됩니다.

```js``` *selector*

* ```DOM querySelectorAll``` 의 선택자를 설정 합니다.

```js``` *option*

* ```classPrefix```
	* ```style``` 적용을 위한 ```class``` 의 접두사를 설정 할 수 있습니다.
	* 기본 접두사는 ```skycode``` 로 설정 되어 있습니다.
	* 적용되는 ```class``` 는 접두사와 추가 ```class``` 사이에는 하이픈(-)으로 구분 됩니다.
