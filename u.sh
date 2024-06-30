info=$1
if ["$info" = ""];
then info="fix:Error: Validation Failed(gitalk)"
fi
git add -A
git commit -m "$info"
git push origin main