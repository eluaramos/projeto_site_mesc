<?php
/** @var \Laravel\Boost\Install\GuidelineAssist $assist */
?>
## Pest

- This project uses Pest for testing. Create tests: ___SINGLE_BACKTICK___<?php echo e($assist->artisanCommand('make:test --pest {name}')); ?>___SINGLE_BACKTICK___.
- The ___SINGLE_BACKTICK___{name}___SINGLE_BACKTICK___ argument should not include the test suite directory. Use ___SINGLE_BACKTICK___<?php echo e($assist->artisanCommand('make:test --pest SomeFeatureTest')); ?>___SINGLE_BACKTICK___ instead of ___SINGLE_BACKTICK___<?php echo e($assist->artisanCommand('make:test --pest Feature/SomeFeatureTest')); ?>___SINGLE_BACKTICK___.
- Run tests: ___SINGLE_BACKTICK___<?php echo e($assist->artisanCommand('test --compact')); ?>___SINGLE_BACKTICK___ or filter: ___SINGLE_BACKTICK___<?php echo e($assist->artisanCommand('test --compact --filter=testName')); ?>___SINGLE_BACKTICK___.
- Do NOT delete tests without approval.
<?php /**PATH C:\Users\MESC\Documents\MESC\site-mesc\storage\framework\views/1df28ea558a91299b445a26d2b6df511.blade.php ENDPATH**/ ?>