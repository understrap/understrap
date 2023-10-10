<?php

declare(strict_types=1);

namespace Understrap\PHPStan;

use PHPStan\Analyser\NameScope;
use PHPStan\PhpDoc\TypeNodeResolverExtension;
use PHPStan\PhpDocParser\Ast\Type\IdentifierTypeNode;
use PHPStan\PhpDocParser\Ast\Type\TypeNode;
use PHPStan\Type\Type;

/**
 * Ensures a 'wpcf7-form-tag-array' type in PHPDoc is recognised to be of type WPCF7FormTagArrayType.
 */
class WPCF7FormTagArrayTypeNodeResolver implements TypeNodeResolverExtension
{
	public function resolve(TypeNode $typeNode, NameScope $nameScope): ?Type
	{
		if ($typeNode instanceof IdentifierTypeNode && $typeNode->__toString() === 'wpcf7-form-tag-array') {
			return new WPCF7FormTagArrayType();
		}

		return null;
	}
}
