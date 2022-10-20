<?php
/**
 * Dynamic return type for get_theme_mod()
 *
 * @package Understrap
 */

namespace Understrap\PHPStan;

use PhpParser\Node\Expr\FuncCall;
use PHPStan\Analyser\Scope;
use PHPStan\Reflection\FunctionReflection;
use PHPStan\Reflection\ParametersAcceptorSelector;
use PHPStan\Type\Constant\ConstantStringType;
use PHPStan\Type\DynamicFunctionReturnTypeExtension;
use PHPStan\Type\MixedType;
use PHPStan\Type\StringType;
use PHPStan\Type\Type;
use PHPStan\Type\TypeCombinator;

/**
 * This class implements dynamic return types for Understrap specific theme mods.
 */
class GetThemeModReturnType implements DynamicFunctionReturnTypeExtension {

	/**
	 * Understrap specific theme modifications.
	 *
	 * @var array<int,string>
	 */
	private static $themeMods = [
		'understrap_bootstrap_version',
		'understrap_container_type',
		'understrap_navbar_type',
		'understrap_sidebar_position',
		'understrap_site_info_override',
	];

	public function isFunctionSupported(FunctionReflection $functionReflection): bool
	{
		return $functionReflection->getName() === 'get_theme_mod';
	}

	public function getTypeFromFunctionCall(
		FunctionReflection $functionReflection,
		FuncCall $functionCall,
		Scope $scope
	): Type
	{
		$argType = $scope->getType($functionCall->getArgs()[0]->value);
		$defaultType = ParametersAcceptorSelector::selectFromArgs(
			$scope,
			$functionCall->getArgs(),
			$functionReflection->getVariants()
		)->getReturnType();

		if (!$argType instanceof ConstantStringType) {
			return $defaultType;
		}

		// Return the default value if it is not an Understrap specific theme mod.
		if (!in_array($argType->getValue(), self::$themeMods, true)) {
			return $defaultType;
		}

		// Without second argument the default value is false, but can be filtered.
		$defaultType = new MixedType();
		if (count($functionCall->getArgs()) > 1) {
			$defaultType = $scope->getType($functionCall->getArgs()[1]->value);
		}

		return TypeCombinator::union(new StringType(), $defaultType);
	}
}
