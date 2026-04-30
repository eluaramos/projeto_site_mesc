---
name: pest-testing
description: "Use this skill for Pest PHP testing in Laravel projects only. Trigger whenever any test is being written, edited, fixed, or refactored — including fixing tests that broke after a code change, adding assertions, converting PHPUnit to Pest, adding datasets, and TDD workflows. Always activate when the user asks how to write something in Pest, mentions test files or directories (tests/Feature, tests/Unit) or architecture tests. Covers: test()/it()/expect() syntax, datasets, mocking, browser testing, arch(), Livewire component tests, RefreshDatabase, and all Pest 3 features. Do not use for editing factories, seeders, migrations, controllers, models, or non-test PHP code."
license: MIT
metadata:
  author: laravel
---
@php
/** @var \Laravel\Boost\Install\GuidelineAssist $assist */
@endphp
# Pest Testing 3

## Documentation

Use ___SINGLE_BACKTICK___search-docs___SINGLE_BACKTICK___ for detailed Pest 3 patterns and documentation.

## Basic Usage

### Creating Tests

All tests must be written using Pest. Use ___SINGLE_BACKTICK___{{ $assist->artisanCommand('make:test --pest {name}') }}___SINGLE_BACKTICK___.

The ___SINGLE_BACKTICK___{name}___SINGLE_BACKTICK___ argument should include only the path and test name, but should not include the test suite.
- Incorrect: ___SINGLE_BACKTICK___{{ $assist->artisanCommand('make:test --pest Feature/SomeFeatureTest') }}___SINGLE_BACKTICK___ will generate ___SINGLE_BACKTICK___tests/Feature/Feature/SomeFeatureTest.php___SINGLE_BACKTICK___
- Correct: ___SINGLE_BACKTICK___{{ $assist->artisanCommand('make:test --pest SomeControllerTest') }}___SINGLE_BACKTICK___ will generate ___SINGLE_BACKTICK___tests/Feature/SomeControllerTest.php___SINGLE_BACKTICK___
- Incorrect: ___SINGLE_BACKTICK___{{ $assist->artisanCommand('make:test --pest --unit Unit/SomeServiceTest') }}___SINGLE_BACKTICK___ will generate ___SINGLE_BACKTICK___tests/Unit/Unit/SomeServiceTest.php___SINGLE_BACKTICK___
- Correct: ___SINGLE_BACKTICK___{{ $assist->artisanCommand('make:test --pest --unit SomeServiceTest') }}___SINGLE_BACKTICK___ will generate ___SINGLE_BACKTICK___tests/Unit/SomeServiceTest.php___SINGLE_BACKTICK___

### Test Organization

- Tests live in the ___SINGLE_BACKTICK___tests/Feature___SINGLE_BACKTICK___ and ___SINGLE_BACKTICK___tests/Unit___SINGLE_BACKTICK___ directories.
- Do NOT remove tests without approval - these are core application code.
- Test happy paths, failure paths, and edge cases.

### Basic Test Structure

Pest supports both ___SINGLE_BACKTICK___test()___SINGLE_BACKTICK___ and ___SINGLE_BACKTICK___it()___SINGLE_BACKTICK___ functions. Before writing new tests, check existing test files in the same directory to match the project's convention. Use ___SINGLE_BACKTICK___test()___SINGLE_BACKTICK___ if existing tests use ___SINGLE_BACKTICK___test()___SINGLE_BACKTICK___, or ___SINGLE_BACKTICK___it()___SINGLE_BACKTICK___ if they use ___SINGLE_BACKTICK___it()___SINGLE_BACKTICK___.

___BOOST_SNIPPET_0___

### Running Tests

- Run minimal tests with filter before finalizing: ___SINGLE_BACKTICK___{{ $assist->artisanCommand('test --compact --filter=testName') }}___SINGLE_BACKTICK___.
- Run all tests: ___SINGLE_BACKTICK___{{ $assist->artisanCommand('test --compact') }}___SINGLE_BACKTICK___.
- Run file: ___SINGLE_BACKTICK___{{ $assist->artisanCommand('test --compact tests/Feature/ExampleTest.php') }}___SINGLE_BACKTICK___.

## Assertions

Use specific assertions (___SINGLE_BACKTICK___assertSuccessful()___SINGLE_BACKTICK___, ___SINGLE_BACKTICK___assertNotFound()___SINGLE_BACKTICK___) instead of ___SINGLE_BACKTICK___assertStatus()___SINGLE_BACKTICK___:

___BOOST_SNIPPET_1___

| Use | Instead of |
|-----|------------|
| ___SINGLE_BACKTICK___assertSuccessful()___SINGLE_BACKTICK___ | ___SINGLE_BACKTICK___assertStatus(200)___SINGLE_BACKTICK___ |
| ___SINGLE_BACKTICK___assertNotFound()___SINGLE_BACKTICK___ | ___SINGLE_BACKTICK___assertStatus(404)___SINGLE_BACKTICK___ |
| ___SINGLE_BACKTICK___assertForbidden()___SINGLE_BACKTICK___ | ___SINGLE_BACKTICK___assertStatus(403)___SINGLE_BACKTICK___ |

## Mocking

Import mock function before use: ___SINGLE_BACKTICK___use function Pest\Laravel\mock;___SINGLE_BACKTICK___

## Datasets

Use datasets for repetitive tests (validation rules, etc.):

___BOOST_SNIPPET_2___

## Pest 3 Features

### Architecture Testing

Pest 3 includes architecture testing to enforce code conventions:

___BOOST_SNIPPET_3___

### Type Coverage

Pest 3 provides improved type coverage analysis. Run with ___SINGLE_BACKTICK___--type-coverage___SINGLE_BACKTICK___ flag.

## Common Pitfalls

- Not importing ___SINGLE_BACKTICK___use function Pest\Laravel\mock;___SINGLE_BACKTICK___ before using mock
- Using ___SINGLE_BACKTICK___assertStatus(200)___SINGLE_BACKTICK___ instead of ___SINGLE_BACKTICK___assertSuccessful()___SINGLE_BACKTICK___
- Forgetting datasets for repetitive validation tests
- Deleting tests without approval
- Prefixing ___SINGLE_BACKTICK___Feature/___SINGLE_BACKTICK___ or ___SINGLE_BACKTICK___Unit/___SINGLE_BACKTICK___ in ___SINGLE_BACKTICK___{name}___SINGLE_BACKTICK___ when using ___SINGLE_BACKTICK___make:test___SINGLE_BACKTICK___
