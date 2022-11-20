<?php

declare(strict_types=1);

namespace Understrap\PHPStan\Types;

use PHPStan\Type\Constant\ConstantArrayType;
use PHPStan\Type\Constant\ConstantStringType;
use PHPStan\Type\ArrayType;
use PHPStan\Type\IntegerType;
use PHPStan\Type\ObjectType;
use PHPStan\Type\StringType;
use PHPStan\Type\VerbosityLevel;
use \WPCF7_Pipes;

/**
 * The custom 'view-string' type class. It's a subset of the string type. Every string that passes the
 * view()->exists($string) test is a valid view-string type.
 */
class WPCF7FormTagArrayType extends ConstantArrayType
{
    public function describe(VerbosityLevel $level): string
    {
        return 'wpcf7-form-tag-array';
    }

    public function __construct()
	{
		$keyTypes = [
			new ConstantStringType('type'),
			new ConstantStringType('basetype'),
			new ConstantStringType('raw_name'),
			new ConstantStringType('name'),
			new ConstantStringType('options'),
			new ConstantStringType('raw_values'),
			new ConstantStringType('values'),
			new ConstantStringType('pipes'),
			new ConstantStringType('labels'),
			new ConstantStringType('attr'),
			new ConstantStringType('content'),
		];
		$valueTypes = [
			new StringType(),
			new StringType(),
			new StringType(),
			new StringType(),
			new ArrayType(new IntegerType(), new StringType()),
			new ArrayType(new IntegerType(), new StringType()),
			new ArrayType(new IntegerType(), new StringType()),
			new ObjectType(WPCF7_Pipes::class),
			new ArrayType(new IntegerType(), new StringType()),
			new StringType(),
			new StringType(),
		];

		parent::__construct($keyTypes, $valueTypes);
	}
}
